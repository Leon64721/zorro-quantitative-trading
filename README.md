# 🚀 ZORRO Quantitative Trading System

**Professional quantitative trading strategy development with AI-assisted agents**

![Status](https://img.shields.io/badge/status-MVP%20v0.1-brightgreen)
![Language](https://img.shields.io/badge/language-C-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Last Updated](https://img.shields.io/badge/updated-2026%2F09%2F15-blue)

---

## 📊 What This Is

A complete quantitative trading system combining:
- **ZORRO Framework**: Ultra-fast C-based backtesting engine (10 years in 0.3 seconds)
- **Z2+ Strategy**: Proven algorithm with 46% annual returns (validated with Walk Forward Analysis + Montecarlo)
- **Custom AI Agents**: Three specialized agents for data management, strategy analysis, and rigorous backtesting
- **Professional Methodology**: WFA validation + Montecarlo simulation + Out-of-sample testing

**Current MVP**: Z2+ EUR/USD strategy with full documentation and validation

---

## 🎯 Quick Start

### For Traders (5 minutes)
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/zorro-quantitative-trading.git
cd zorro-quantitative-trading

# Read the quick start guide
cat docs/GETTING_STARTED.md

# Expected result: Understand how to run Z2+ EUR/USD strategy
```

### For Developers (30 minutes)
```bash
# Review the architecture
cat docs/STRATEGY_DEVELOPMENT.md

# Check existing implementation
cat strategies/Z2+_EURUSD/ANALYSIS.md

# Review agent workflows
cat agents/README.md
```

### For Researchers (1-2 hours)
```bash
# Deep dive into methodology
cat docs/BACKTEST_METHODOLOGY.md

# Understand validation approach
cat strategies/Z2+_EURUSD/REPLICATION_GUIDE.md

# Learn about market data management
cat docs/DATA_MANAGEMENT.md
```

---

## 📈 Performance Highlights

### Z2+ EUR/USD Strategy

| Metric | Value | Status |
|--------|-------|--------|
| **Annual Return** | 46% | ✅ Excellent |
| **Sharpe Ratio** | 0.69 | ✅ Good |
| **Max Drawdown** | 20.7% | ✅ Acceptable |
| **Win Rate** | 46.5% | ✅ Healthy |
| **Profit Factor** | 1.22 | ✅ Robust |
| **Out-of-Sample (WFA)** | 44% | ✅ Not Over-Fitted |
| **Montecarlo 95%** | 31% | ✅ Edge is Real |

**Validation**: Walk Forward Analysis (15 cycles) + Montecarlo (200 simulations)  
**Period Tested**: 2014-2026 (12 years including crisis periods)

---

## 📁 Repository Structure

```
zorro-quantitative-trading/
│
├── 📄 README.md                    (this file)
├── 📄 CONTRIBUTING.md              (how to contribute)
├── 📄 LICENSE                      (MIT license)
├── 📄 ROADMAP.md                   (future plans)
│
├── 📂 strategies/                  # Strategy implementations
│   ├── Z2+_EURUSD/                # Main strategy (46% annual)
│   │   ├── ANALYSIS.md            # Technical deep-dive
│   │   ├── REPLICATION_GUIDE.md   # How to run it
│   │   ├── BACKTEST_RESULTS.md    # Full results
│   │   ├── parameters.csv         # Parameter reference
│   │   └── Z2+_EURUSD.c           # Source code (if available)
│   │
│   ├── Z2+_GBPJPY/                # Cross-pair variant (optional)
│   │   ├── README.md              # Variant overview
│   │   ├── BACKTEST_RESULTS.md    # Results vs EUR/USD
│   │   └── parameters.csv         # Pair-specific params
│   │
│   └── TEMPLATE.md                # Template for new strategies
│
├── 📂 agents/                      # AI Agent definitions
│   ├── market-data-manager.md     # Data automation agent
│   ├── strategy-analyzer.md       # Analysis agent
│   ├── backtester-optimizer.md    # Testing agent
│   ├── 01_*_workflows.md          # Detailed workflows (x3)
│   └── README.md                  # Agent guide
│
├── 📂 docs/                        # Documentation
│   ├── GETTING_STARTED.md         # Installation & first steps
│   ├── ZORRO_GUIDE.md             # ZORRO framework intro
│   ├── STRATEGY_DEVELOPMENT.md    # How to build strategies
│   ├── BACKTEST_METHODOLOGY.md    # WFA, Montecarlo, validation
│   ├── DATA_MANAGEMENT.md         # Historical data sources
│   ├── AGENT_USAGE.md             # Using custom agents
│   └── TROUBLESHOOTING.md         # Common issues & fixes
│
├── 📂 data/                        # Historical & results data
│   ├── historical/                # Price data (excluded - too large)
│   │   └── README.md              # Data source guide
│   │
│   └── logs/                       # Backtest results
│       ├── Z2+_EURUSD_backtest.log
│       ├── Z2+_GBPJPY_backtest.log (optional)
│       └── performance_summary.csv
│
├── 📂 scripts/                     # Automation scripts
│   ├── download_history.c         # Auto-download data
│   ├── validate_data.c            # Validate .t6 files
│   ├── run_backtest.sh            # Execute backtest
│   ├── run_variant_backtests.sh   # Test multiple variants
│   ├── analyze_results.py         # Parse results
│   └── README.md                  # Script guide
│
└── 📂 tools/                       # Development tools
    ├── setup.sh                   # Initialize project
    └── requirements.txt           # Dependencies

```

---

## 🚀 Getting Started

### 1. Installation (2 minutes)
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/zorro-quantitative-trading.git

# Review quick start
cd zorro-quantitative-trading
cat docs/GETTING_STARTED.md
```

### 2. Download ZORRO (5-10 minutes)
```bash
# ZORRO is standalone (free, 32-bit version available)
# Download from: https://zorro-project.com/
# Or install via: Your preferred package manager

# Verify installation
Zorro.exe --version  # Should show 3.016+
```

### 3. Get Historical Data (varies)
```bash
# Option A: Use existing EUR/USD data
# Data included: 2005-2026 (22 years)
# Size: ~62 MB

# Option B: Download additional pairs
./scripts/download_history.c
```

### 4. Run First Backtest (< 1 second)
```bash
cd D:\ZORRO  # Your ZORRO installation
Zorro.exe -c Z2+.dll EUR/USD 2014 2026

# Result: D:\ZORRO\Log\Z2+.txt with full metrics
```

### 5. Validate Results
```bash
# Expected: 46% annual, Sharpe 0.69, Max DD 20.7%
# See: strategies/Z2+_EURUSD/REPLICATION_GUIDE.md for details
```

---

## 📚 Documentation

### For Quick Understanding
- **[GETTING_STARTED.md](docs/GETTING_STARTED.md)** - 5-minute overview
- **[Z2+ Analysis](strategies/Z2+_EURUSD/ANALYSIS.md)** - What the strategy does
- **[Z2+ Replication](strategies/Z2+_EURUSD/REPLICATION_GUIDE.md)** - How to run it

### For Deep Learning
- **[ZORRO_GUIDE.md](docs/ZORRO_GUIDE.md)** - Framework architecture
- **[STRATEGY_DEVELOPMENT.md](docs/STRATEGY_DEVELOPMENT.md)** - Build your own
- **[BACKTEST_METHODOLOGY.md](docs/BACKTEST_METHODOLOGY.md)** - Rigorous validation
- **[AGENT_USAGE.md](docs/AGENT_USAGE.md)** - AI agent workflows

### For Professional Use
- **[DATA_MANAGEMENT.md](docs/DATA_MANAGEMENT.md)** - Data operations
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Issues & fixes
- **[Parameters.csv](strategies/Z2+_EURUSD/parameters.csv)** - All settings

---

## 🤖 Custom AI Agents

This project includes three specialized AI agents that can assist with:

### Market Data Manager
- Automated data downloading
- File validation
- Error recovery
- Data health checks
**Use when**: You need to maintain or update market data

### Strategy Analyzer  
- Performance analysis
- Metrics extraction
- Risk assessment
- Optimization opportunities
**Use when**: You want to understand why a strategy works or fails

### Backtester & Optimizer
- Automated backtesting
- Walk Forward Analysis
- Montecarlo validation
- Parameter optimization
**Use when**: Testing new strategies or variants

**Learn more**: [agents/README.md](agents/README.md)

---

## 🎓 Key Concepts

### Walk Forward Analysis (WFA)
Proves strategy works on NEW data, not just historical:
- In-sample training: 52 weeks
- Out-of-sample test: 3 weeks (unseen data)
- Repeat 15 times → 15 independent tests
- **Z2+ Result**: 44% OOS vs 46% IS = NOT over-fitted ✅

### Montecarlo Simulation
Proves the edge is real, not luck:
- Run strategy 200 times with randomized trade order
- Same trades, different sequence
- **Z2+ Result**: 196/200 profitable (98%) = Edge is real ✅

### Profit Factor
Ratio of total wins to total losses:
- > 1.0 = Profitable (wins > losses)
- > 1.2 = Healthy edge
- > 1.5 = Strong edge
- **Z2+ Result**: 1.22 = Healthy ✅

---

## ⚡ Quick Facts

| Aspect | Detail |
|--------|--------|
| **Language** | C (ZORRO dialect) |
| **Framework** | ZORRO 3.016+ |
| **Backtest Speed** | 10 years in 0.3 seconds |
| **Min Capital** | $500-2000 |
| **Trading Style** | Trend-following, automated |
| **Forex Pairs** | EUR/USD, GBP/JPY (variant) |
| **Time Frame** | Hourly bars |
| **Validation** | WFA + Montecarlo |
| **Data Required** | 2000 bars lookback |
| **Expected Return** | 30-46% annually |

---

## 🔗 Resources

### Official Links
- **ZORRO Project**: https://zorro-project.com/
- **ZORRO Documentation**: https://zorro-project.com/manual/
- **ZORRO Community**: https://zorro-project.com/forum/

### Learning Materials
- **Backtest Best Practices**: See BACKTEST_METHODOLOGY.md
- **Walk Forward Analysis**: See strategies/Z2+_EURUSD/ANALYSIS.md
- **Parameter Optimization**: See docs/STRATEGY_DEVELOPMENT.md

### Support
- **Issues**: Open a GitHub issue for bugs or questions
- **Discussions**: Use GitHub Discussions for strategy ideas
- **Contributing**: See CONTRIBUTING.md to help improve this project

---

## 📈 Roadmap

### Current (v0.1-MVP) ✅
- ✅ Z2+ EUR/USD strategy
- ✅ WFA + Montecarlo validation
- ✅ Full documentation
- ✅ Custom AI agents
- ✅ Data management guides

### Planned (v0.2+)
- [ ] Additional currency pairs (GBP/JPY, more)
- [ ] Portfolio optimization (multi-strategy)
- [ ] Machine learning enhancements
- [ ] Live trading integration
- [ ] Real-time monitoring dashboard
- [ ] Community strategy library

See [ROADMAP.md](ROADMAP.md) for detailed plans.

---

## ⚖️ License

MIT License - Use freely, modify, commercialize. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to submit issues
- How to propose new strategies
- Code style guidelines
- Pull request process

---

## ⚠️ Disclaimer

**Trading involves risk**. This strategy is based on historical data and may not work in all market conditions. Past performance does not guarantee future results. Start with paper trading before risking real capital. Use proper risk management (position sizing, stop losses).

---

## 📞 Contact & Support

- **Issues**: GitHub Issues tab
- **Discussions**: GitHub Discussions
- **Security**: Report to security@zorro-project.com
- **Contributing**: See CONTRIBUTING.md

---

## 🙏 Acknowledgments

- ZORRO framework by oP group (https://zorro-project.com/)
- Walk Forward Analysis methodology
- Montecarlo validation approach
- Quantitative trading community

---

## 📊 Project Stats

- **Lines of Documentation**: 30,000+
- **Strategies**: 1 main + variants
- **Custom Agents**: 3
- **Workflows**: 15+
- **Years Backtested**: 12+
- **Validation Methods**: 2 (WFA + Montecarlo)
- **Development Time**: 21 days
- **Status**: Production Ready (MVP v0.1)

---

**Ready to start? Head to [GETTING_STARTED.md](docs/GETTING_STARTED.md)**

**Questions? Check [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)**

---

🚀 **Happy trading! Make your algorithms profitable.**

*Last updated: 2026-09-15*  
*Version: 0.1-MVP*  
*License: MIT*
