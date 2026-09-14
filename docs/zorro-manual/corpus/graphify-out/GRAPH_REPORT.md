# Graph Report - corpus  (2026-09-14)

## Corpus Check
- 226 files · ~276,699 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1376 nodes · 1677 edges · 215 communities (70 shown, 124 thin omitted)
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 297 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Advanced & Exotic Indicators
- Optimization & Walk-Forward Config
- Deep Learning & DLL Development
- Zorro Basics & Asset Symbols
- Account Balance & Broker Trading
- FTP Transfer & Fuzzy Logic
- Credits, Structs & Historical Data
- Trade Variables (TMF)
- Cloud Deployment & Trade Statistics
- ML Advisors & R Lectures
- Math Functions & Expressions
- Margin, Drawdown & Performance Stats
- Trade Loops & Control Flow
- String Handling Functions
- Options/Futures Contract Functions
- Robustness Testing & File Export
- DLLs, APIs & Lite-C for C++
- Bars, Candles & Time Frame
- Dataset Handling Functions
- Status & Mode Flags
- Plotting, Colors & Charting
- Panel UI & Run Function
- Contract Variables (Futures/Options)
- Global Variables & Example Scripts
- Series, Sorting & Array Functions
- Init Flags & Memory
- Stop/Entry/Exit Trade Limits
- Markowitz Portfolio Math
- Volatility & Trend Indicators (ATR/ADX)
- Contract Selector & Dataset Storage
- File I/O & Console Output
- Tick/Bar Event Callbacks
- Save/Load Status Functions
- History Loading & Lookback
- Moving Average & Band Indicators
- Oscillator Indicators (MACD/RSI/Stochastic)
- Signal Processing & Prediction
- Day/Price Series & Plots
- Evaluation Shell Analysis
- Sentiment & COT Report
- Fill Simulation & Pricing
- C Memory Management
- Adaptive Moving Averages
- Chart Viewer & Error Handling
- Backtesting & Log Debugging
- Lowpass Filters & Trend Workshop
- Loop Iteration Variables
- Evaluation Shell Adaptation
- Platform Code Conversion
- Spectral Filters & Counter-Trend Workshop
- Monte Carlo & Logging
- Test/Train Mode Flags
- Tick Timing & Latency
- Broker Plugin Functions
- Trading Cost Variables
- Strategy Coding Workshops
- Currency Strength Functions
- WFO Cycle Flags
- Python Bridge Functions
- R Bridge Functions
- HighPass Filter Family
- putvar/getvar Persistence
- Percentile Statistics Functions
- Statistical Moment Functions
- Broker Local/Market Time
- Market Session Boundaries
- File Append Functions
- FIR Filter Variants
- VPS Reliability Features
- Zorro Setup & Deployment
- break/continue Statements
- Trig Functions (sin/cos/tan)
- Broker Flat Position Flags
- Broker Request Function
- Deep Learning Hyperparameters
- File Navigation Functions
- Max Long/Short Limits
- Date/Time Conversion
- Hour/Minute Functions
- Local Date/Week Variables
- Time of Day/Week
- Plot Text Function/Variable
- priceC/priceO Functions
- priceH/priceL Functions
- Daily/Weekly Profit Plots
- MAE/MFE Plot Functions
- Line/Slope Functions
- Win/Loss Payout Variables
- Ichimoku Cloud Lines
- Correlation Trend Indicator
- Hull & Weighted MA
- Least Squares Moving Average
- Momentum & Return Indicators
- Support/Resistance Lines
- Volatility Variants
- lite-C Intro & Workshop 1
- Loop Statements
- abs() Function
- Inverse Trig Functions
- BR_LEISURE Flag
- BR_LOGOFF Flag
- BR_MARKET Flag
- BR_NOSHIFT Flag
- BR_SLEEP Flag
- FrameOffset Variable
- BrokerHistory2 Plugin Function
- BrokerTime Plugin Function
- comboMargin Function
- comboPrint Function
- comboStrike Function
- comboType Function
- DayOffset Variable
- Now Variable
- file_date Function
- file_length Function
- file_sortCSV Function
- Amplitude Variable
- genNoise Function
- genSquare Function
- betweenF Fuzzy Function
- ReTest Macro
- ReTrain Macro
- contract.c Header
- legacy.h Header
- profile.c Header
- r.h Header (R Bridge)
- AUTOCOMPILE Flag
- NOFACTORS Flag
- NOWATCH Flag
- OPENEND Flag
- PEEK Flag
- STRAIGHT Flag
- VCPP Flag
- day() Function
- dom() Function
- dow() Function
- dst() Function
- ldow() Function
- lhour() Function
- ltod() Function
- ltow() Function
- market() Function
- minutesAgo() Function
- minutesWithin() Function
- month() Function
- ndow() Function
- nthDay() Function
- second() Function
- tom() Function
- wdateBar() Function
- week() Function
- workday() Function
- year() Function
- Core Variable
- SampleCycle Variable
- TotalCycle Variable
- BidSize Variable
- InitialPrice Variable
- plotData Function
- plotHistogram Function
- PlotBorder Variable
- PlotHeight1 Variable
- PlotHeight2 Variable
- PlotLabels Variable
- PlotPeriod Variable
- PlotStart Variable
- PlotWidth Variable
- marketVal Function
- marketVol Function
- priceReal Function
- seriesC Function
- seriesH Function
- seriesL Function
- plotBuyHold Function
- plotDay Function
- plotMAEPercentGraph Function
- plotMFEPercentGraph Function
- plotMonth Function
- plotMonthProfit Function
- plotQuarterProfit Function
- plotTradeProfile Function
- plotWeek Function
- plotWFOProfit Function
- plotYear Function
- pyInt Python Bridge
- pyStr Python Bridge
- Ri (R Bridge Integer)
- Zorro Redistribution License
- switch..case Statement
- timer() Function
- Square Root Reinvestment Rule
- Trade Distribution Plot
- Disable Live Trading Option
- Z6+ Adaptive Grid System

## God Nodes (most connected - your core abstractions)
1. `Technical Indicators and Technical Analysis` - 131 edges
2. `TMF and Trade Variables` - 53 edges
3. `Zorro Algo Trading Functions Index` - 40 edges
4. `Contracts: Options, Futures, FOPs` - 34 edges
5. `String Functions` - 32 edges
6. `Dataset handling` - 30 edges
7. `Strategy Performance Statistics` - 28 edges
8. `Status Flags` - 27 edges
9. `TrainMode` - 24 edges
10. `INITRUN flag` - 23 edges

## Surprising Connections (you probably didn't know these)
- `between` --semantically_similar_to--> `BR_WEEKEND`  [INFERRED] [semantically similar]
  en/between.md → en/barmode.md
- `call` --semantically_similar_to--> `BrokerCommand (plugin function)`  [INFERRED] [semantically similar]
  en/call.md → en/brokerplugin.md
- `ContractRow variable` --conceptually_related_to--> `Dataset handling`  [INFERRED]
  en/contracts.md → en/data.md
- `Migrating Algorithmic Trading Code` --references--> `Petra Volkova (contributor)`  [INFERRED]
  en/conversion.md → en/credits.md
- `exec` --semantically_similar_to--> `zOpen`  [INFERRED] [semantically similar]
  en/exec.md → en/engine.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **lite-C Loop Control Flow Statements** — en_acrt_break, en_acrt_continue [EXTRACTED 0.90]
- **Zorro Machine Learning Prediction Methods** — en_advisor, en_advisor_dtree, en_advisor_perceptron, en_advisor_pattern, en_advisor_neural [EXTRACTED 0.90]
- **Zorro Asset/Account Configuration System** — en_asset, en_account, en_algovar, en_assetzone, en_assetmode [INFERRED 0.85]
- **Zorro Elementary Math Functions** — en_avar_exp_exp, en_avar_log_log, en_avar_pow_pow, en_avar_sqrt_sqrt [INFERRED 0.85]
- **Bar Timing and Frame Configuration** — en_barperiod_barperiod, en_barperiod_timeframe, en_barmode_barmode, en_bar_bar [INFERRED 0.85]
- **Broker Plugin Integration Architecture** — en_brokercommand_brokercommand, en_brokerplugin_brokerplugin, en_brokers_brokers [INFERRED 0.85]
- **Option Combo Trading Workflow** — en_combo_combo, en_combo_comboadd, en_combo_comboprofit, en_combo_comborisk, en_combo_combopremium, en_combo_plotcombo [INFERRED 0.85]
- **Chart Visualization Color System** — en_chart_chart, en_colors_colors, en_color_color [INFERRED 0.75]
- **Options Contract Selection and Pricing Workflow** — en_contract_contractupdate, en_contract_contract, en_contract_contractprice, en_contracts_contractval [INFERRED 0.80]
- **CSV to Dataset Conversion Pipeline** — en_data_dataparse, en_data_datasave, en_data_dataappendrow, en_contract_contract [INFERRED 0.75]
- **Cold Blood Index Drawdown Validation** — en_ddscale_cbi, en_ddscale_cbiscale, en_ddscale_returncbi, en_export_pnlcurves [INFERRED 0.85]
- **Price Curve Detrending and Shaping** — en_detrend_detrend, en_detrend_shape, en_date_startdate [INFERRED 0.75]
- **Deep Learning Backend Integrations** — en_deeplearning_deeplearning, en_deeplearning_torch, en_deeplearning_keras, en_deeplearning_mxnet [INFERRED 0.80]
- **Networking and Remote Data Transfer Functions** — en_ftp_ftp_download, en_http_http_transfer, en_hmac_hmac [INFERRED 0.75]
- **Virtual Hedging Trade Management Pattern** — en_hedge_hedge, en_hedge_virtual_hedging, en_fortrades_open_trades [INFERRED 0.80]
- **lite-C Control Flow Constructs** — en_if_if, en_for_for, en_ifelse_ifelse [INFERRED 0.70]
- **Train/Test Flag Configuration Workflow** — en_is_train, en_is_test, en_mode_skip3, en_mode_logfile, en_mode_ticks [EXTRACTED 1.00]
- **Markowitz Efficient Frontier Calculation Workflow** — en_markowitz_markowitz, en_markowitz_markowitzreturn, en_markowitz_markowitzvariance [EXTRACTED 1.00]
- **Trade Size Limit and Accumulate Workflow** — en_mode_marginlimit, en_mode_risklimit, en_mode_accumulate [EXTRACTED 1.00]
- **Walk-Forward Optimization and Parameter Training Workflow** — en_numwfocycles_numwfocycles, en_numsamplecycles_numsamplecycles, en_numtotalcycles_numtotalcycles, en_optimize_optimize, en_objective_objective, en_opt_trainmode [INFERRED 0.85]
- **OptimalF Capital Assignment Workflow** — en_optimalf_optimalf, en_opt_trainmode, en_performance_performance [INFERRED 0.75]
- **Control Panel UI Creation and Event Handling** — en_panel_panel, en_panel_panelset, en_panel_click [INFERRED 0.85]
- **Chart Plotting Configuration** — en_plot_plot, en_plotbars_plotbars, en_plotmode_plotmode [INFERRED 0.85]
- **External ML Scripting Bridges** — en_python_pystart, en_rbridge_rstart, en_python_pyx [INFERRED 0.80]
- **Portfolio Capital Distribution Pattern** — en_renorm_distribute, en_renorm_assign, en_renorm_knapsack [EXTRACTED 0.90]
- **Series generation, reversal, and conversion pipeline** — en_series_series, en_rev_rev, en_rev_conv [INFERRED 0.75]
- **Trade exit and cancellation management** — en_selllong_exitlong, en_selllong_exitshort, en_selllong_exittrade, en_selllong_canceltrade [INFERRED 0.80]
- **Evaluation shell job-to-portfolio pipeline** — en_shell_job, en_shell_summary, en_shell_cluster_analysis, en_shell_montecarlo_analysis, en_shell_portfolio [EXTRACTED 1.00]
- **Asset trading cost calculation (roundturn cost formula)** — en_spread_spread, en_spread_slippage, en_spread_commission, en_spread_rolllong, en_spread_rollshort [EXTRACTED 1.00]
- **Moving Average Indicator Family** — en_ta_sma, en_ta_ema, en_ta_wma, en_ta_dema, en_ta_tema, en_ta_hma, en_ta_kama [INFERRED 0.85]
- **Oscillator Indicator Family** — en_ta_rsi, en_ta_stoch, en_ta_cci, en_ta_macd [INFERRED 0.80]
- **Trade Exit / Risk Management Parameters** — en_stop_stop, en_stop_trail, en_stop_takeprofit, en_stop_traillock [INFERRED 0.85]
- **Workshop 4 Trend Trading Workflow** — en_tutorial_trade_trend_following_strategy, en_filter_lowpass, en_ta_mmi, en_stop_stop [INFERRED 0.85]
- **Workshop 5 Counter-Trend Signal Workflow** — en_tutorial_fisher_counter_trend_script, en_filter_bandpass, en_transform_fishern, en_crossover_crossover, en_optimize_optimize [INFERRED 0.85]
- **Z1/Z2 Sub-algorithms Forming Z12 Portfolio** — en_zsystems_z1, en_zsystems_z2, en_zsystems_z12 [EXTRACTED 1.00]
- **Profit Total Formula Components** — en_winloss_profit_metrics, en_winloss_wintotal, en_winloss_losstotal, en_winloss_winvaltotal, en_winloss_lossvaltotal [EXTRACTED 1.00]

## Communities (215 total, 124 thin omitted)

### Community 0 - "Advanced & Exotic Indicators"
Cohesion: 0.03
Nodes (67): ADO (Accumulation/Distribution Oscillator), ALMA (Arnaud Legoux Moving Average), Aroon Indicator, Aroon Oscillator, AvgPrice, Beta, BOP (Balance Of Power), CCYI (Ehlers Correlation Cycle Indicator) (+59 more)

### Community 1 - "Optimization & Walk-Forward Config"
Cohesion: 0.07
Nodes (47): BarOffset, at, mtu, strdate, tdm, utm, wdatef, Zorro Release History / What's New (+39 more)

### Community 2 - "Deep Learning & DLL Development"
Cohesion: 0.05
Nodes (45): EndDate, GapDays, NumYears, StartDate, Activation function, Deep Learning for Market Prediction, Deepnet (R), Epoch (+37 more)

### Community 3 - "Zorro Basics & Asset Symbols"
Cohesion: 0.05
Nodes (45): Zorro Control Panel, Getting Started with Zorro, Z Strategies (Zorro built-in strategies), strcon, Algorithmic Trading and Market Inefficiencies, Deep Learning Neural Net Prediction Example, Market Inefficiency, Random-Walk Price Curve (+37 more)

### Community 4 - "Account Balance & Broker Trading"
Cohesion: 0.07
Nodes (44): Balance, Equity, TradeVal, Broker Arbitrage, brokerAccount (script function), brokerCommand, brokerTrades, BrokerAccount (+36 more)

### Community 5 - "FTP Transfer & Fuzzy Logic"
Cohesion: 0.07
Nodes (39): fmod, ftp_download, ftp_getdate, ftp_log, ftp_sent, ftp_size, ftp_status, ftp_stop (+31 more)

### Community 6 - "Credits, Structs & Historical Data"
Cohesion: 0.06
Nodes (38): Command[0..3], Define, Zorro Command Line, Charting Library (Advanced Software Engineering Ltd), Credits & Disclaimer, Cryptographic Libraries (E. Young, T. Hudson / OpenSSL), IB TWS Bridge (A. Dolder), JSON parser (S.A. Zaitsev) (+30 more)

### Community 7 - "Trade Variables (TMF)"
Cohesion: 0.05
Nodes (38): ThisTrade, TMF and Trade Variables, TradeAlgo, TradeAsset, TradeBarClose, TradeBarOpen, TradeBars, TradeCommission (+30 more)

### Community 8 - "Cloud Deployment & Trade Statistics"
Cohesion: 0.07
Nodes (37): Verbose, Zorro in the Cloud / VPS Setup, Multiple Zorro Instances, Publishing the Trading Status, Providing Trade Signals (ZuluTrade), Unlocking Zorro S, LossGlobal, LossLong/LossShort/LossTotal (+29 more)

### Community 9 - "ML Advisors & R Lectures"
Cohesion: 0.09
Nodes (36): Variables, Arrays, Strings (lite-C), Asset Lists and Account Lists, Machine Learning: adviseLong, adviseShort, DTREE (Decision Tree) method, NEURAL (external machine learning) method, neural() callback function, PATTERN (Pattern Analyzer) method, PERCEPTRON (logistic regression) method (+28 more)

### Community 10 - "Math Functions & Expressions"
Cohesion: 0.07
Nodes (35): exp, log, pow, sqrt, BR_WEEKEND, between, cdf, dnorm (+27 more)

### Community 11 - "Margin, Drawdown & Performance Stats"
Cohesion: 0.06
Nodes (33): MarginTotal, MarginVal, RiskTotal, MarginCost, AEDepth (Current Adverse Excursion), CommissionCost, DrawDownAtBar, DrawDownBars (+25 more)

### Community 12 - "Trade Loops & Control Flow"
Cohesion: 0.10
Nodes (29): for, for(all_algos), for(all_trades), break_algos, break_assets, break_trades, for(closed_trades), for(current_trades) (+21 more)

### Community 13 - "String Handling Functions"
Cohesion: 0.07
Nodes (29): atof, atoi, sftoa, sscanf, strcat, strcatf, strchr, strcmp (+21 more)

### Community 14 - "Options/Futures Contract Functions"
Cohesion: 0.11
Nodes (28): contract.c source file, contractChain function, contractClass function, contractDelta function, contractExercise function, contractFind function, contractIntrinsic function, contractLetter function (+20 more)

### Community 15 - "Robustness Testing & File Export"
Cohesion: 0.09
Nodes (28): DataHorizon variable, DataSkip variable, DataSlope variable, DataSplit variable, DataSlope, DataSkip, DataSplit, CBI, CBIScale, Cold Blood Index (+20 more)

### Community 16 - "DLLs, APIs & Lite-C for C++"
Cohesion: 0.09
Nodes (28): Using DLLs and APIs, api.def file, COM classes / DirectX DLL usage, DefineApi function, API() macro, Using C library or Windows API functions, No early if(A && B) abort, Enums replaced by #define (+20 more)

### Community 17 - "Bars, Candles & Time Frame"
Cohesion: 0.09
Nodes (25): BarMode, BarPeriod, TimeFrame, Bars, Ticks, Candles Glossary, Traditional Candle Patterns, CDLDoji, CDLEngulfing0, CDLOutside (+17 more)

### Community 18 - "Dataset Handling Functions"
Cohesion: 0.09
Nodes (22): Dataset handling, dataAppend function, dataChart function, dataClip function, dataCol function, dataCompress function, dataCompressSelf function, dataCopy function (+14 more)

### Community 19 - "Status & Mode Flags"
Cohesion: 0.10
Nodes (22): AFFIRMED flag, ASSETSET flag, BUSY flag, CHANGED flag, COMMAND flag, COMPILED flag, DEMO flag, EXITRUN flag (+14 more)

### Community 20 - "Plotting, Colors & Charting"
Cohesion: 0.13
Nodes (21): color, colorScale, ColorBars[3], ColorDD, ColorDn, ColorEquity, ColorLoss, ColorPanel[6] (+13 more)

### Community 21 - "Panel UI & Run Function"
Cohesion: 0.13
Nodes (20): BrokerCommand (plugin function), call, click, panel, panelFix, panelGet, panelLoad, panelMerge (+12 more)

### Community 22 - "Contract Variables (Futures/Options)"
Cohesion: 0.11
Nodes (20): contractCheck function, contractDays function, contractUpdate function, Centage variable, ContractAsk variable, ContractBid variable, ContractExpiry variable, ContractHandle variable (+12 more)

### Community 23 - "Global Variables & Example Scripts"
Cohesion: 0.11
Nodes (20): Algo variable, Asset variable, Assets string array, Curves variable, History variable, Predefined/user-supplied strings, RootName variable, SymbolTrade variable (+12 more)

### Community 24 - "Series, Sorting & Array Functions"
Cohesion: 0.12
Nodes (14): diff, Rd, conv function, rev function, ref macro, series function, SeriesBuffer variable, SeriesLength variable (+6 more)

### Community 25 - "Init Flags & Memory"
Cohesion: 0.12
Nodes (18): Init macro, INITRUN flag, LOOKBACK status flag, memory() function, BALANCE flag, EXE flag, EXPORTED flag, LEAN flag (+10 more)

### Community 26 - "Stop/Entry/Exit Trade Limits"
Cohesion: 0.12
Nodes (17): Entry (entry limit/stop), OrderLimit, Stop (stop loss), StopFactor, StopPool, TakeProfit, Trade Entry and Exit Limits, TrailLock (+9 more)

### Community 27 - "Markowitz Portfolio Math"
Cohesion: 0.13
Nodes (16): markowitz() function, markowitzReturn() function, markowitzVariance() function, matAdd() function, matMul() function, matrix() function, matSaveCSV() function, matScale() function (+8 more)

### Community 28 - "Volatility & Trend Indicators (ATR/ADX)"
Cohesion: 0.16
Nodes (16): Trail (trailing stop), ADX (Average Directional Movement Index), ADXR (ADX Rating), ATR (Average True Range), ATRS (Simple Average True Range), Chandelier Exit Short, Chandelier Exit Long, DX (Directional Movement Index) (+8 more)

### Community 29 - "Contract Selector & Dataset Storage"
Cohesion: 0.15
Nodes (14): comboPremium, comboProfit, comboRisk, contract() selector function family, CONTRACT struct, ThisContract variable, COT function, dataAppendRow function (+6 more)

### Community 30 - "File I/O & Console Output"
Cohesion: 0.18
Nodes (14): exec, file_content, file_read, file_write, Format Codes and Tables, keys() function, mouse, order (+6 more)

### Community 31 - "Tick/Bar Event Callbacks"
Cohesion: 0.19
Nodes (11): bar (user-defined bar function), event, tick(), tick, tock, callback Functions, TMF (Trade Management Function) / manage(), TradeIsClosed, TradeIsEntry, TradeIsOpen (+3 more)

### Community 32 - "Save/Load Status Functions"
Cohesion: 0.17
Nodes (13): loadStatus() function, SaveMode variable, saveStatus() function, SV_ALGOVARS flag, SV_ALGOVARS2 flag, SV_BACKUP flag, SV_HTML flag, SV_SLIDERS flag (+5 more)

### Community 33 - "History Loading & Lookback"
Cohesion: 0.18
Nodes (12): MaxBars, assetHistory() function, assetSource() function, H_HISTORY dataset handle, PriceStep variable, LookBack variable, LookBackNeeded variable, LookBackResolution variable (+4 more)

### Community 34 - "Moving Average & Band Indicators"
Cohesion: 0.18
Nodes (12): AC (Accelerator Oscillator), Alligator Indicator, AO (Awesome Oscillator), APO (Absolute Price Oscillator), Bollinger Bands, Bollinger Bands Oscillator, DPO (Detrended Price Oscillator), Keltner Channel (+4 more)

### Community 35 - "Oscillator Indicators (MACD/RSI/Stochastic)"
Cohesion: 0.18
Nodes (12): CCI (Commodity Channel Index), CMO (Chande Momentum Oscillator), ConnorsRSI, Divergence Detection, MACD (Moving Average Convergence/Divergence), MACDExt, MACDFix, RSI (Relative Strength Index) (+4 more)

### Community 36 - "Signal Processing & Prediction"
Cohesion: 0.24
Nodes (10): filter, renorm, frechet, peak, valley, polyfit, polynom, predict (+2 more)

### Community 37 - "Day/Price Series & Plots"
Cohesion: 0.24
Nodes (11): dayClose, dayHigh, dayLow, dayPivot, timeOffset, AskSize, price, seriesO (+3 more)

### Community 38 - "Evaluation Shell Analysis"
Cohesion: 0.25
Nodes (11): Action menu, Cluster Analysis (CA), INI macro (shell .ini file settings), Job (evaluation shell parameter set), Montecarlo Analysis (Reality Check), Oversampling (price fluctuation robustness), Final Portfolio, R2 coefficient (+3 more)

### Community 39 - "Sentiment & COT Report"
Cohesion: 0.24
Nodes (10): Zorro Manual Content Overview, contractCPD function, cpd function, cpdv function, Market Sentiment: Price Probability Distribution, COT_CommercialIndex function, COT_CommercialPos function, COT_OpenInterest function (+2 more)

### Community 40 - "Fill Simulation & Pricing"
Cohesion: 0.22
Nodes (10): Fill, HFT Simulation, AskPrice, BidPrice, priceQuote, priceSet, Penalty variable, Slippage variable (+2 more)

### Community 41 - "C Memory Management"
Cohesion: 0.24
Nodes (10): sizeof() macro, Structs, free, malloc, memcmp, memcpy, C Memory Functions, memset (+2 more)

### Community 42 - "Adaptive Moving Averages"
Cohesion: 0.22
Nodes (10): Coral Indicator, DEMA (Double Exponential Moving Average), EMA (Exponential Moving Average), KAMA (Kaufman Adaptive Moving Average), ROC (Rate of Change), SIROC (Smoothed Rate of Change), T3 Moving Average, TEMA (Triple Exponential Moving Average) (+2 more)

### Community 43 - "Chart Viewer & Error Handling"
Cohesion: 0.22
Nodes (8): Chart Viewer and Debugger, email, error(), cleanup, evaluate, Performance Report, Backtesting and Log Analysis, watch() function

### Community 44 - "Backtesting & Log Debugging"
Cohesion: 0.31
Nodes (9): EasyLanguage (TradeStation/MultiCharts/TradeSignal), NinjaScript (NinjaTrader), crossOver function, crossUnder function, crossOver, crossUnder, rMomentum variable, touch function, ChatGPT Coding Mentor (+1 more)

### Community 45 - "Lowpass Filters & Trend Workshop"
Cohesion: 0.22
Nodes (9): AGC, Butterworth, Laguerre, LowPass, MMI (Market Meanness Index), Gauss() Filter, lowpass() Custom Filter Function, Z-Transform (+1 more)

### Community 46 - "Loop Iteration Variables"
Cohesion: 0.22
Nodes (9): PORTFOLIO flag, Itor1 variable, Itor2 variable, loop() function, Loop1 variable, Loop2 variable, NumLoops1 variable, NumLoops2 variable (+1 more)

### Community 47 - "Evaluation Shell Adaptation"
Cohesion: 0.22
Nodes (9): assetLoop() function, END_OF_VARS statement, eval.c include, eval.h include, evars.h include, _optimize call (shell variable optimization), Evaluation Shell: Adapting a Strategy, V struct (shell variable container) (+1 more)

### Community 48 - "Platform Code Conversion"
Cohesion: 0.29
Nodes (8): AFL (Amibroker), Migrating Algorithmic Trading Code, MatLab code conversion, MQL4/MQL5 (MetaTrader Expert Advisors), Neuroshell Trader DLL indicators, PineScript (TradingView), Python Bridge, R Bridge

### Community 49 - "Spectral Filters & Counter-Trend Workshop"
Cohesion: 0.25
Nodes (8): BandPass, DominantPeriod, DominantPhase, genSine, Spectrum, FisherN(), Counter-Trend Strategy (Workshop5), Portfolio Strategy (Workshop6.c)

### Community 50 - "Monte Carlo & Logging"
Cohesion: 0.29
Nodes (8): MARGINCALL flag, Log messages, Trade log symbol format ([AUD/USD:CY:S1234]), Capital variable, LOGFILE flag, Confidence variable, Monte Carlo Confidence Analysis, MonteCarlo variable

### Community 51 - "Test/Train Mode Flags"
Cohesion: 0.29
Nodes (7): Button, Test macro, TESTMODE flag, Train macro, TRAINMODE flag, PLOTNOW flag, TESTNOW flag

### Community 52 - "Tick Timing & Latency"
Cohesion: 0.29
Nodes (7): MaxRequests, MaxTicks, TickFix, TickTime, TickTime, TickSmooth (Time and Latency), TockTime, UpdateTime

### Community 53 - "Broker Plugin Functions"
Cohesion: 0.33
Nodes (6): brokerAsset (script function), BrokerAsset, BrokerBuy2, BrokerLogin, BrokerOpen, BrokerSell2

### Community 54 - "Trading Cost Variables"
Cohesion: 0.33
Nodes (6): Commission variable, Interest variable, PriceOffset variable, RollLong variable, RollShort variable, Spread variable

### Community 55 - "Strategy Coding Workshops"
Cohesion: 0.40
Nodes (6): Workshop 5: Counter-Trend Trading & WFO, Workshop 6: Portfolio Strategies, Workshop 4a: Indicator Implementation, Workshop 8: Options Trading, Workshop 7: Machine Learning, Workshop 4: Trend Trading

### Community 56 - "Currency Strength Functions"
Cohesion: 0.40
Nodes (5): ccyMax, ccyMin, ccyReset, ccySet, ccyStrength

### Community 57 - "WFO Cycle Flags"
Cohesion: 0.40
Nodes (5): FACCYCLE flag, PARCYCLE flag, ALLCYCLES flag, FACTORS flag, PARAMETERS flag

### Community 58 - "Python Bridge Functions"
Cohesion: 0.40
Nodes (5): pySet, pyStart, pyVar, pyVec, pyX

### Community 59 - "R Bridge Functions"
Cohesion: 0.40
Nodes (5): Rrun, Rset, Rstart, Rv, Rx

### Community 60 - "HighPass Filter Family"
Cohesion: 0.50
Nodes (4): HighPass, HighPass1, HighPass2, HighPass3

### Community 61 - "putvar/getvar Persistence"
Cohesion: 0.67
Nodes (4): getvar, putvar, report, strvar

### Community 62 - "Percentile Statistics Functions"
Cohesion: 0.50
Nodes (3): Median() Filter, Percentile(), PercentRank()

### Community 63 - "Statistical Moment Functions"
Cohesion: 0.83
Nodes (4): Moment(), SemiMoment(), StdDev(), Variance()

### Community 64 - "Broker Local/Market Time"
Cohesion: 0.67
Nodes (3): BR_LOCAL, AssetMarketEnd, AssetMarketStart

### Community 65 - "Market Session Boundaries"
Cohesion: 1.00
Nodes (3): EndMarket, StartMarket, dayOpen

### Community 66 - "File Append Functions"
Cohesion: 0.67
Nodes (3): file_append, file_appendCSV, file_appendfront

### Community 67 - "FIR Filter Variants"
Cohesion: 0.67
Nodes (3): FIR3, FIR4, FIR6

### Community 68 - "VPS Reliability Features"
Cohesion: 0.67
Nodes (3): Fallback Server, Surviving Reboots (startup.bat), Time-Triggered Scripts

### Community 69 - "Zorro Setup & Deployment"
Cohesion: 0.67
Nodes (3): Zorro Installation & Folders, Zorro on Linux/Mac (Wine/VMWare), Zorro64 (64-bit) & C++

## Ambiguous Edges - Review These
- `DataSlope variable` → `DataSlope`  [AMBIGUOUS]
  en/opt.md · relation: conceptually_related_to
- `WFOCycle` → `TrainCycle`  [AMBIGUOUS]
  en/opt.md · relation: conceptually_related_to

## Knowledge Gaps
- **731 isolated node(s):** `Quantitative Trading with R (book)`, `Covariance Matrix (Portfolio Risk)`, `ggplot2 (R Graphing Library)`, `abs() function`, `break statement` (+726 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 768 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **124 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `DataSlope variable` and `DataSlope`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `WFOCycle` and `TrainCycle`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Technical Indicators and Technical Analysis` connect `Advanced & Exotic Indicators` to `Moving Average & Band Indicators`, `Oscillator Indicators (MACD/RSI/Stochastic)`, `Zorro Basics & Asset Symbols`, `Day/Price Series & Plots`, `Adaptive Moving Averages`, `Lowpass Filters & Trend Workshop`, `Momentum & Return Indicators`, `Volatility Variants`, `Ichimoku Cloud Lines`, `Correlation Trend Indicator`, `Hull & Weighted MA`, `Least Squares Moving Average`, `Volatility & Trend Indicators (ATR/ADX)`, `Support/Resistance Lines`, `Series, Sorting & Array Functions`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `Stop (stop loss)` connect `Stop/Entry/Exit Trade Limits` to `Account Balance & Broker Trading`, `Trade Variables (TMF)`, `Lowpass Filters & Trend Workshop`, `Volatility & Trend Indicators (ATR/ADX)`, `Tick/Bar Event Callbacks`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `ATR (Average True Range)` connect `Volatility & Trend Indicators (ATR/ADX)` to `Advanced & Exotic Indicators`, `Zorro Basics & Asset Symbols`, `Lowpass Filters & Trend Workshop`, `Spectral Filters & Counter-Trend Workshop`, `Stop/Entry/Exit Trade Limits`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **What connects `Quantitative Trading with R (book)`, `Covariance Matrix (Portfolio Risk)`, `ggplot2 (R Graphing Library)` to the rest of the system?**
  _731 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Advanced & Exotic Indicators` be split into smaller, more focused modules?**
  _Cohesion score 0.029850746268656716 - nodes in this community are weakly interconnected._