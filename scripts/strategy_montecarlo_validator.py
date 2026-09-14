#!/usr/bin/env python3
"""
Montecarlo Validator for Strategy_1_1_133 ES
Validates statistical edge through simulation

Usage:
python strategy_montecarlo_validator.py <backtest_results_file>
"""

import numpy as np
import pandas as pd
import json
from datetime import datetime
from statistics import mean, stdev, quantiles
import sys

class MontecarloValidator:
    """Validate trading strategy edge through Montecarlo simulation"""

    def __init__(self, num_simulations=200, confidence_level=95):
        self.num_simulations = num_simulations
        self.confidence_level = confidence_level
        self.results = []
        self.original_return = 0
        self.trades = []

    def parse_zorro_log(self, log_file):
        """Parse ZORRO backtest log file"""
        trades = []

        with open(log_file, 'r') as f:
            lines = f.readlines()

        # Extract trades from log
        # Format: Trade#, Entry Date, Entry Price, Exit Date, Exit Price, Return
        for line in lines:
            if 'Trade' in line and 'Return' in line:
                try:
                    # Simple parser - adjust based on your ZORRO log format
                    parts = line.split(',')
                    if len(parts) >= 6:
                        trade = {
                            'entry_date': parts[1].strip(),
                            'entry_price': float(parts[2]),
                            'exit_date': parts[3].strip(),
                            'exit_price': float(parts[4]),
                            'return': float(parts[5]),
                            'pl': float(parts[5]),  # P&L in points
                        }
                        trades.append(trade)
                except:
                    continue

        self.trades = trades
        return trades

    def parse_csv_results(self, csv_file):
        """Parse results from CSV file"""
        df = pd.read_csv(csv_file)
        trades = []

        for _, row in df.iterrows():
            trade = {
                'entry_price': row.get('Entry', 0),
                'exit_price': row.get('Exit', 0),
                'return': row.get('Return', 0),
                'pl': row.get('PL', 0),
                'win': 1 if row.get('Return', 0) > 0 else 0,
            }
            trades.append(trade)

        self.trades = trades
        return trades

    def calculate_original_metrics(self):
        """Calculate metrics from original backtest"""
        if not self.trades:
            print("Error: No trades loaded")
            return None

        returns = [t['return'] for t in self.trades]
        wins = [t for t in returns if t > 0]
        losses = [t for t in returns if t <= 0]

        metrics = {
            'total_trades': len(self.trades),
            'winning_trades': len(wins),
            'losing_trades': len(losses),
            'win_rate': len(wins) / len(self.trades) if self.trades else 0,
            'total_return': sum(returns),
            'avg_return': mean(returns) if returns else 0,
            'std_dev': stdev(returns) if len(returns) > 1 else 0,
            'sharpe_ratio': (mean(returns) / stdev(returns)) if stdev(returns) > 0 else 0,
            'profit_factor': sum(wins) / abs(sum(losses)) if losses else float('inf'),
        }

        self.original_return = metrics['total_return']
        return metrics

    def run_simulation(self):
        """Run single Montecarlo simulation (shuffle trade order)"""
        if not self.trades:
            return None

        # Shuffle trades (preserve distribution)
        shuffled_trades = np.random.permutation(self.trades)

        # Calculate return for shuffled sequence
        returns = [t['return'] for t in shuffled_trades]
        return sum(returns)

    def run_montecarlo(self):
        """Execute Montecarlo simulations"""
        print(f"\nRunning {self.num_simulations} Montecarlo Simulations...")
        print("=" * 70)

        results = []
        for i in range(self.num_simulations):
            result = self.run_simulation()
            results.append(result)

            if (i + 1) % 50 == 0:
                print(f"Progress: {i + 1}/{self.num_simulations} simulations completed")

        self.results = results
        return results

    def calculate_confidence_intervals(self):
        """Calculate confidence intervals"""
        if not self.results:
            return None

        # Sort results
        sorted_results = sorted(self.results)

        # Calculate percentiles
        q = [self.confidence_level / 2, 100 - self.confidence_level / 2]
        ci_lower = np.percentile(sorted_results, q[0])
        ci_upper = np.percentile(sorted_results, q[1])

        # Calculate other statistics
        stats = {
            'mean': mean(self.results),
            'std_dev': stdev(self.results) if len(self.results) > 1 else 0,
            'median': sorted_results[len(sorted_results) // 2],
            'min': min(self.results),
            'max': max(self.results),
            'ci_lower': ci_lower,
            'ci_upper': ci_upper,
            'ci_level': self.confidence_level,
        }

        return stats

    def calculate_edge_confidence(self):
        """Calculate probability that strategy is profitable"""
        if not self.results:
            return 0

        profitable = sum(1 for r in self.results if r > 0)
        confidence = (profitable / len(self.results)) * 100

        return confidence

    def calculate_probability_of_ruin(self, account_size=10000):
        """Calculate probability of ruin based on returns"""
        if not self.trades:
            return 0

        # Simple calculation: how many simulations resulted in losses > 50% of account
        ruin_threshold = -account_size * 0.5
        ruined = sum(1 for r in self.results if r < ruin_threshold)
        prob_ruin = (ruined / len(self.results)) * 100 if self.results else 0

        return prob_ruin

    def generate_report(self, output_file=None):
        """Generate comprehensive Montecarlo report"""

        print("\n" + "=" * 70)
        print("MONTECARLO VALIDATION REPORT")
        print("=" * 70)

        # Original metrics
        original = self.calculate_original_metrics()
        if original:
            print("\n📊 ORIGINAL BACKTEST RESULTS")
            print("-" * 70)
            print(f"Total Trades: {original['total_trades']}")
            print(f"Winning Trades: {original['winning_trades']}")
            print(f"Losing Trades: {original['losing_trades']}")
            print(f"Win Rate: {original['win_rate']:.2%}")
            print(f"Total Return: ${original['total_return']:.2f}")
            print(f"Avg Return per Trade: ${original['avg_return']:.2f}")
            print(f"Std Dev: ${original['std_dev']:.2f}")
            print(f"Sharpe Ratio: {original['sharpe_ratio']:.4f}")
            print(f"Profit Factor: {original['profit_factor']:.2f}")

        # Montecarlo results
        if self.results:
            stats = self.calculate_confidence_intervals()
            edge_conf = self.calculate_edge_confidence()
            prob_ruin = self.calculate_probability_of_ruin()

            print("\n🎲 MONTECARLO ANALYSIS ({} simulations)".format(len(self.results)))
            print("-" * 70)
            print(f"Mean Return: ${stats['mean']:.2f}")
            print(f"Std Dev: ${stats['std_dev']:.2f}")
            print(f"Median Return: ${stats['median']:.2f}")
            print(f"Min Return: ${stats['min']:.2f}")
            print(f"Max Return: ${stats['max']:.2f}")
            print(f"\n{stats['ci_level']}% Confidence Interval:")
            print(f"  Lower Bound: ${stats['ci_lower']:.2f}")
            print(f"  Upper Bound: ${stats['ci_upper']:.2f}")
            print(f"\nProfitable Simulations: {edge_conf:.1f}%")
            print(f"Probability of Ruin (>50% loss): {prob_ruin:.1f}%")

            # Edge assessment
            print("\n✅ EDGE ASSESSMENT")
            print("-" * 70)
            if edge_conf > 90:
                print(f"Edge Confidence: STRONG ({edge_conf:.1f}%)")
                print("Verdict: REAL EDGE - Strategy is statistically profitable")
            elif edge_conf > 75:
                print(f"Edge Confidence: MODERATE ({edge_conf:.1f}%)")
                print("Verdict: LIKELY EDGE - Validate with more data")
            elif edge_conf > 60:
                print(f"Edge Confidence: WEAK ({edge_conf:.1f}%)")
                print("Verdict: POSSIBLE EDGE - Needs optimization")
            else:
                print(f"Edge Confidence: VERY WEAK ({edge_conf:.1f}%)")
                print("Verdict: NO EDGE - Reconsider strategy")

            if prob_ruin < 5:
                print(f"Risk Profile: LOW - Probability of ruin: {prob_ruin:.1f}%")
            elif prob_ruin < 15:
                print(f"Risk Profile: MODERATE - Probability of ruin: {prob_ruin:.1f}%")
            else:
                print(f"Risk Profile: HIGH - Probability of ruin: {prob_ruin:.1f}%")

        print("\n" + "=" * 70)
        print("END OF REPORT")
        print("=" * 70)

        # Save to file if requested
        if output_file:
            with open(output_file, 'w') as f:
                f.write("MONTECARLO VALIDATION REPORT\n")
                f.write("=" * 70 + "\n\n")
                f.write(json.dumps({
                    'original': original,
                    'montecarlo': {
                        'num_simulations': len(self.results),
                        'statistics': stats,
                        'edge_confidence': edge_conf,
                        'probability_of_ruin': prob_ruin,
                    }
                }, indent=2))
            print(f"\nReport saved to: {output_file}")

# ═══════════════════════════════════════════════════════════════════════════════
# USAGE EXAMPLE
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":

    # Initialize validator
    validator = MontecarloValidator(num_simulations=200, confidence_level=95)

    # Load results from backtest
    # Option 1: From ZORRO log file
    # validator.parse_zorro_log("D:\\ZORRO\\Log\\Strategy_1_1_133_ES_CONVERTED.log")

    # Option 2: From CSV file (recommended)
    # Create a CSV file with your backtest results first
    # CSV format: Trade#, Entry Date, Entry Price, Exit Date, Exit Price, Return

    try:
        # Auto-detect results file
        import os
        if os.path.exists("backtest_results.csv"):
            validator.parse_csv_results("backtest_results.csv")
        else:
            print("Please provide backtest results in CSV format")
            print("Column names needed: Entry, Exit, Return")
            sys.exit(1)

        # Run validation
        validator.run_montecarlo()

        # Generate report
        validator.generate_report("montecarlo_report.txt")

    except FileNotFoundError as e:
        print(f"Error: {e}")
        print("\nUsage:")
        print("  python strategy_montecarlo_validator.py <results_file>")
        print("\nExample:")
        print("  python strategy_montecarlo_validator.py backtest_results.csv")
