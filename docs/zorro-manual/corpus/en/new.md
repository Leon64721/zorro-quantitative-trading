# New Functions and Features | Zorro Project

Source: https://zorro-project.com/manual/en/new.htm

New Functions and Features | Zorro Project


# What's new?


### Updating Zorro 3.01 to Zorro 3.11 - questions and answers


- The data format in **64-bit mode** has changed.
		Recompile 64-bit scripts.

- How do I **update a live trading Zorro**? The procedure is described under [Trading](trading.htm#update).
		If assets or algos were changed, continue the old version at zero volume
		so that no new trades are opened. Wail until all old trades are closed,
		then start trading with the new version.

- Why do I get **error messages**
		when the script previously compiled fine? Most likely due to improved error
		detection, a
		name conflict with a new keyword, or a deprecated variable or function.
		Deprecated keywords are
		defined in **legacy.h**, which can be included for still using
		them.
-
		Why do I get **different
		backtest results**? This is normal due to new price histories or new asset parameters.
		You can determine the exact reason by comparing both logs.

- Why can't I **test the new Z system**?
		You need recent historical data. Get it from the
		[Zorro download page](https://zorro-project.com/download.php).

- Why are my **settings**
		gone? You probably edited the default settings, which are overwritten by
		any update.
		Keep individual settings in individual files, like **ZorroFix.ini**, **Z1+.ini**,
		**Z2+.ini**, etc. They won't be overwritten.


### Zorro 3.12 beta


- Lite-C compiler messages are now printed to **
	Log\litec.log**.

- The [exec](exec.htm) function got a shortcut for the image
	viewer.

- The algo compare function of the [Evaluation Shell](shell.htm)
	now generates an image for better comparison.

- The new **Apex** portfolio for
	[RangerZ](https://zorro-project.com/rangerz.php)
	yields > 350% out-of-sample annual return.

- The [evaluation shell](shell.htm) now supports parameter
	setting per .ini file.


Beta versions or release candiates are
	available on the
	[Zorro Download Page](https://zorro-project.com/download.php). [Zorro S features](restrictions.htm)
	can be unlocked in beta versions with a valid Zorro license. [Z strategies](zsystems.htm)
	are not included in beta versions. A list of fixed bugs can
be found under [bugs](bugs.htm).


# Future Zorro features

	If you want a new Zorro function, feature,
	or a new broker plugin, there are two ways to get it.
	You can either pay us for implementing it, and donate the feature to the community. Or you can suggest it on the
	[
	User Forum](https://opserver.de/ubb7/ubbthreads.php?ubb=cfrm&c=1) in the Zorro Future section. There
	you can also comment or support features suggested by other users. We
	normally implement any suggested feature when it is useful
	(please give a usage example), popular (supported by
	other users), backwards compatible (won't break existing
	scripts), and efficient (saves a lot of code in a script). How long it takes depends on the usefulness of the
	feature and how hard it is to implement. Donated features have priority.


# Zorro Release History


### Zorro 3.11 (July 2026)


-  The [Evaluation Shell](shell.htm) got new functions for
	algo selection and algo
	comparison.

- The [phantom](phantom.htm) function now activates phantom
	trading automatically for the current algo.

- New plugin: [cTrader](ctrader.htm)

- The [SMAFast](ta.htm) indicator is a two times faster variant
	of the [SMA](ta.htm).

- The [IB plugin](ib.htm) now supports adjusted D1 historical
	data.

- The default asset parameters - **AssetsFix.csv** - are
	now based on an FXCM 100:1 account.


### Zorro 3.01 (February 2026)


- The new [Evaluation Shell](shell.htm) automatizes most of the
	strategy development process.

- Pending trades are now saved and resumed when restarting a session.

- For compatibility with other platforms, 1 point simulated slippage was
	automatically applied to orders.

- The [loop](loop.htm) function now also accepts an array of
	algo names.

- The [LogFolder](script.htm) for the log files and reports can
	now be set up in by script.

- The [64 bit FXCM plugin](fxcm.htm) is now officially included
	(it was 'unoffially' already in 2.70). 

- New file functions: [file_appendCSV](file_.htm),
	[file_sortCSV](file_.htm).

- New string functions: [strvarCSV](str_.htm),
	[strtextCSV](str_.htm),
	[strfield](str_.htm).

- The often used [MMI](ta.htm) function was recoded and is now
	10x faster.

- [NOFLAT](mode.htm) skips flat bars.

- The [phantom](phantom.htm) function makes equity curve
	trading easier.

- Moving a slider now triggers the [click](panel.htm) function.

- The [event](call.htm) function allows re-assigning
	user-supplied functions to script events.

- The IB plugin now supports the [SET_RESTART](brokercommand.htm)
	command for overcoming the daily disconnection.


### Zorro 2.70 (September 2025)


- The new **Z6+** trading system with adaptive grid was added to the
	[Z systems](zsystems.htm).

- John Ehlers' improved [HighPass3](filter.htm) filter and his
	[LRSI](ta.htm) indicator were
	added to the indicator library.

- The [DrawDownPercent](statistics.htm) variable returns the
	largest drawdown depth in percent of the preceding balance peak.

- [MaxLong/MaxShort](lots.htm) now affect training when the
	[LIMITS](opt.htm) flag is set. They update also the open trade
	lifetime when [TR_EXTEND](trademode.htm) is set.

- The [trade list](export) format has changed. The list now
	also contains commission, MAE, and MFE of trades.

- The [MAE](transform.htm) function returns the maximum adverse
	excursion of a data series.

- The [TR_ANYSTOP/ANYLIMIT](trademode.htm) flags affect the
	trailing of entry or exit stops and limits when trades are updated.

- The [Fill](fill.htm) mode was changed. Limit entries and
	exits now fill at the current price. The previous limit
	fill behavior can be activated with Fill mode 2. It [TR_FRC](trademode.htm) is not set, fill prices are
		now rounded to the point size of the asset.

- The format of the parameter files (***.par**) was changed.
	Parameters and training results are now stored in CSV format.

- A WFO cycle analysis was added to the [
	performance report](performance.htm).

- The [contractExpiry](contract.htm) function can be used to
	generate a contract symbol.

- The **[strselect](str_.htm)** function opens a
	selection dialog.

- The [Button](button.htm) variable refects the way the code
	was started.


### Zorro 2.66 (April 2025)


- [assetHistory](loadhistory.htm) can now also load tick data
	with volume to **.t2** files.

- [T2 historical data](history.htm) is now supported by the
	[IB
	TWS bridge](ib.htm).

- The [Ulcer Index](performance.htm) has been modified to
	reflect the maximum MAE, instead of the average.

- [T1 historical data](history.htm) is now supported by the
	[Binance plugin](binance.htm).

- The [contractChain](contract.htm) function loads option
	chains much faster (10 sec instead of 20 min).

- The [GET_CHAIN](brokercommand.htm) command is now supported
	by the IB TWS bridge.

- Compiling a [C++ script](dlls.htm) will now automatically
	generate a **VC++ project file** (Zorro S only).


### Zorro 2.64 (January 2025)


- The data format has changed in 64-bit mode. Recompile 64-bit script DLLs.

- The [dataCompressSelf](data.htm) function compresses a
	dataset for reducing its file size.

- [dataCol](data.htm) now returns the indices of the minimum
	and maximum valuies.

- [dataSort](data.htm) can now sort in ascending order.

- The **[SET_ORDERGROUP](brokercommand.htm)**
	command is now supported by the [IB plugin](ib.htm) for OCA
	orders.

- The [GET_PRICE](brokercommand.htm) and
	[GET_VOLUME](brokercommand.htm) commands are supported by the [IB plugin](ib.htm).

- The [Binance Spot](binance.htm) plugin now supports **
	LIMIT_MAKER** orders.

- Unix-like timestamps ([%t format code](format.htm)) now also
	support microseconds.

- The script name can be accessed by plugins through the
	[report](report.htm) function.

- The [matSort](matrix.htm) function sorts a two-dimensional
	matrix.

- [AUTOCOMPILE](mode.htm) can now be set by script.

- Non-linear Trade profits, as from inverse contracts, can now be updated
	by script in a [TMF](trade.htm).


### Zorro 2.62 (July 2024)


- Python machine learning libraries can now be used with the
	[advise](advisor.htm) function.

- A **neural** function for [
	PyTorch](deeplearning.htm) was implemented.

- The [IB plugin](ib.htm) has been updated to the latest TWS
	API version.

- The [NumAbove](transform.htm) function returns the number of
	data points above a threshold.

- The [Exchange](contracts.htm) string can now be used to
	direct contract orders to a particular exchange.


- New indicator: [Parkinson Volatility](ta.htm).
- The
	[Z8 and Z9](zsystems.htm) systems now export a rebalance file
	that can be directly imported in the TWS 'Rebalance Portfolio' window.
	Fractional shares are supported.

### Zorro 2.60 (December 2023)


- Various small improvements to the [IB plugin](ib.htm) for
	better differentiating between orders and trades.

- The [BrokerTrade](brokerplugin.htm) function can now
	distiguish between cancelled and filled orders.

- [Stops](stop.htm) and [order limits](stop.htm) are
	now automatically rounded to the next PIP step when sent to the broker. This
	can be disabled with the [TR_FRC](trademode.htm) flag.

- If the last leg of a [combo order](combo.htm) timed out, the
	other legs are automatically cancelled.

- [Combo orders](combo.htm) can now be entered at
	[OrderLimit](stop.htm).

- New trade macros: [TradeFill](trade.htm),
	[TradeValue](trade.htm).


### Zorro 2.56 (June 2023)


- The [AssetPtr](algovar.htm) and [AlgotPtr](algovar.htm) definitions allow storing
	asset or algo specific pointers.

- The IB plugin was adapted to the name change **DTB** ->
	**
	EUREX**.

- The [plot2](profile.htm) function plots curves in two colors.

- New plugins: [Saxo Bank](saxo.htm), [XTB](xtb.htm).

- The A2 and HU algos of **Z12** have been modified and
	improved.

- New function: [strcatf](str_.htm).

- Example script for generating a [multi-broker
	asset list](brokerarb.htm).

- The [sync](frame.htm) function can synchronize prices or
	indicators to higher time frames.


### Zorro 2.53 (January 2023)


- [strdate](month.htm) now supports milliseconds.

- New helper functions: [cum](ifelse.htm), [fix0](invalid.htm), [changed](ifelse.htm)

- [assetHistory](loadhistory.htm) can now download data in
	arbitrary resolution.

- [SeriesLength](series.htm) contains the number of elements of
	the current series.

- [AssetFirstBar](numbars.htm) contains the number of the first valid bar of the current
	asset.

- [LogZone](assetzone.htm) prints the log and chart in a
	particular time zone.

- [PL_DARK](plotmode.htm) generates a chart with a dark
	background.

- [AssetsFUT](account.htm) is a new asset list with 20 often
	traded futures.

- Trade entry and exit prices are calculated in higher precision with
	[special bars](bar.htm).

- The [Performance](scripts.htm) script evaluates arbitrary
	values from the [performance report](performance.htm).

- The IB plugin now supports the [DO_CANCEL,0](brokercommand.htm)
	command that cancels all open orders.

- The IB plugin now supports the [
	BrokerTrade](brokerplugin.htm) function for determining the fill status of open orders.

- The [sha / hmac](hmacl.htm) function makes crypto broker
	plugin development easier.

- [http_request](http.htm) supports different request types and
	replaces the **http_send** function.

- The new [Bittrex plugin](bittrex.htm) now supports API
	version 3.0. A new Bittrex asset list was included.

- The [brokerRequest](brokercommand.htm) function allows a
	script to send arbitrary requests to a broker API.

- New plugin: [Finvasia](finvasia.htm).

- Duplicate timestamps from t6 files are now filtered out by
	[assetHistory](loadhistory.htm).

- Dataset records can be removed with [dataDelete](data.htm).

- The new [import](import.htm) page helps with data conversion.

- A new article on
	[
	Financial Hacker](https://financial-hacker.com/crypto-trading-with-rest-part-1/) helps with plugin development.

- [BR_LOCAL](barmode.htm) does not anymore automatically alter
	[BarZone](assetzone.htm). Set it by script (**BarZone =
	AssetMarketZone**) if needed.


### Zorro 2.50 (August 2022)


- [strdate](month.htm) now supports a time zone.

- [exec](exec.htm) got a flag for hiding the program window.

- [C++ scripts](dlls.htm) now start directly, like **.c**
	scripts ([Zorro S](restrictions.htm) and Visual Studio required).

- The [VCPP](mode.htm) flag uses the VC++ compiler, rather than
	the lite-C compiler, for compiling rules.

- The [quit](quit.htm) function can now restart the script.

- [LookBackNeeded](lookback.htm) is set to the maximum needed
	lookback period.

- Some adaptions to **zorro.h** and **functions.h**
	for 64-bit compatibility.

- A new **64 bit Zorro version** has been included. It uses
	[VC++](dlls.htm) for compiling scripts.

- 64 bit versions of the [MT4 bridge](mt4plugin.htm) and the
	**Offline** plugin have been added.

- The charting library was updated. The [dataChart](data.htm)
	function now supports heatmaps.

- The [outlier correction](outlier.htm) was modified for
	producing less artifacts with cryptos.

- The [Python bridge](python.htm) now supports string
	variables.

- The [Python bridge](python.htm) now loads the Python DLL at
	script start and supports any Python version from 3.6 or above.

- [file_select](file_.htm) now supports a file save dialog.

- The [STRAIGHT](mode.htm) flag allows running ta-lib functions
	in their original mode.

- [Hedge](hedge.htm) mode 6 allows trade synchronization by
	script.


### Zorro 2.48 (May 2022)


- [MatchIndex](transform.htm) finds the data closest to a
	reference in a series.

- The time zone and market hours of an asset can now be set up in the
	Market field of the [asset list](account.htm).

- New variables for easy handling asset specific market hours:
	[AssetMarketZone](assetzone.htm),
	[AssetMarketStart](date.htm), [AssetMarketEnd](date.htm).

- Market hours for index CFDs have been added to the Oanda asset lists.

- [PriceOffset](spread.htm) allows handling negative prices by
	shifting them to the positive scale.

- [Notepad++](npp.htm) has been updated to version 8.2.

- The [SET_FUNCTIONS](brokercommand.htm) broker command allows
	Zorro functions to be called from a plugin.

- [Penalty](spread.htm) adds a fixed spread-like offset to
	trade fill prices for special purposes.

- [AssetPrev](script.htm) stores the main asset inside
	enumeration loops.

- [PL_HLOC](plotmode.htm) enforces HLOC bars on the chart.

- The [IB plugin](ib.htm) now supports the
	[GET_FILL](brokercommand.htm) command for returning the current
	fill amount of open GTC orders.

- The [at](month.htm) function can trigger events at a certain
	local time of day.

- Asset updates can be temporarily suspended with the
	[NOPRICE](assetmode.htm) flag.

- Swaps can be continuously accumulated with the [
	SOFTSWAP](assetmode.htm) flag.

- The time for asset updates can be measured with the
	[UpdateTime](ticktime.htm) variable.

- A name beginning with **'#'** in [asset](asset.htm)
	calls creates a dummy asset with flat history.

- The **Z3** cluster strategy missed the performance criteria
	and was removed from the [Z
systems](zsystems.htm).


- New functions: [barssince](ifelse.htm), [
	valuewhen](ifelse.htm) with code in **indicators.c**.

- New [ref()](series.htm) macro for more convenient script
	conversion from other platforms.

- [dataCompress](data.htm) got a **Resolution**
	parameter for compressing datasets even further.

- A plugin for the [FTX exchange](ftx.htm) has been developed
	by a Zorro user.

- The [plotBuyHold](profile.htm) function compares the strategy
	returns with a buy-and-hold benchmark.

- The [Yahoo](loadhistory.htm) data feed has be re-activated.

- New data feed: [EODHistoricalData](loadhistory.htm), with
	subscription discount for Zorro users.

- New scripts: [MRC](scripts.htm) and [
	WFOProfile](scripts.htm).

- The chart title can now be changed with [
	print(TO_CHART,...)](printf.htm).

- [plotGraph](plot.htm) now supports scatter plots and spline
	lines.

- **BR_ASSET** was replaced by [
	BR_NOSHIFT](barmode.htm) and [BR_LOCAL](barmode.htm).


### Zorro 2.44 (December 2021)


- New flag [PIPRETURN](mode.htm) for exporting
	volume-independent profit curves.

- New plugins: [Coinbase Pro](gdax.htm),
	[TradeStation](tradestation.htm)

- [NumOutliers](outlier.htm) counts the outliers in the data.

- [fmod](fmod.htm) returns the fractional remainder of a
	division.

- [SET_VOLTYPE,7](brokercommand.htm) returns the open interest
	(if available from the broker).

- [LookBackResolution](lookback.htm) sets the resolution of the
	live lookback history. .

- If a lookback bar ends after the session start time, it is now continued
	into the live period.

- Script, asset, and action boxes can now be scaled with the application
	window.

- [tradeUpdate](tradeupdate.htm) scales or modifies an open
	trade.

- The default estimate of [trades per bar](lookback.htm) was
	slightly reduced for saving memory.

- [TMF](trade.htm) functions now also run on incoming ticks
	when the trade is still pending (bugfix).

- The [BuyHold](scripts.htm) script can be used for comparing a
	system with a SPY buy-and-hold strategy.

- Loading history with no year number can be enforced with
	the [History](script.htm) string.

- New **PlotMode** flag: [PL_TITLE](plotmode.htm)

- The Oanda asset lists have been modified for 0.1 CFD lot size.

- The [ExpiryTime](contracts.htm) default was changed to 23:00
	UTC for avoiding option expiration during market hours.


### Zorro 2.40 (August 2021)


- New text style flag **+16** for bold text on
	[panel cells](panel.htm).

- [PriceJump](outlier.htm) can now also detect stock merges.

- The [Russell2000](account.htm) asset list was included.

- [GET_DATA](brokercommand.htm) was implemented in the [IEX plugin](iex.htm).

- New broker commands: [SET_SERVER](brokercommand.htm),
	[SET_CCY](brokercommand.htm)

- [SET_SERVER](brokercommand.htm) was implemented in the
	[Binance plugin](binance.htm). 

- New plugins: [Kraken](kraken.htm), [Deribit](deribit.htm),
	[Binance Futures](binancefutures.htm).

- [Leverage](pip.htm) can now be set individually per trade
	when the API supports the [SET_LEVERAGE](brokercommand.htm)
	command. 

- The [tock](tick.htm) function is now executed after
	[tick](tick.htm), thus ensuring that all recent ticks had been
	processed at **tock** time.

- [file_copy](file_.htm) now accepts a folder as destination.

- The [CSVfromHistory](scripts.htm) script converts .t6 to .csv
	files.

- The IB [TWS/Gateway](ib.htm) socket port number can now be
	set up in the **Server** field of the account list.

- New [Coinbase](gdax.htm) plugin by a Zorro user.

- The current script folder is returned by [report(26)](report.htm).

- If the strategy folder was [redefined](ini.htm), the **
	#include "..."** statement now reads files from the new folder.

- The structure of an unknown dataset can be determined with [
	dataSize](data.htm).

- [dataParseString](data.htm) converts a JSON string to a
	dataset.

- [mtu](month.htm) converts Unix time to the DATE format.

- [matSaveCSV](matrix.htm) saves a matrix to a CSV file.

- [Brute Force, Genetic, and External](opt.htm) optimizations
	now export results to CSV and generate 2D contour charts..

- [dataChart](data.htm) generates a 2D countour chart from a
	dataset.

- [dataCol](data.htm) retrieves data arrays or series from a
	dataset.

- Order book data (**.t2** files) can now also be used for
	the price history with **History = "*.t2"**.

- [TickTime](ticktime.htm) now also affects backtests in
	**TICKS** mode, and can be used to reduce the memory footprint.

- New broker command: [GET_HEARTBEAT](brokercommand.htm).

- New script [Reality.c](scripts.htm) as a template for reality
	checks.

- [BarPeriod](barperiod.htm) can now be set up by script to
	weekly bars.

- Partial closing is now also supported in [Fill](fill.htm)
	mode 3.

- The [contractUpdate](contract.htm) function now sorts
	contract chains automatically by expiration and strike.

- We found that scripts often use the [loop](loop.htm) function
	unnecessarily, and thus added [of](loop.htm) as an alternative.

- The [NOFACTORS](mode.htm) flag prevents OptimalF calculation,
	which can take a long time when trade numbers are huge.

- **FAST** backtest mode was abandoned, since standard
	backtests are almost as fast as fast backtests.

- The backtest profit by linear regression of the equity curve can be
	retrieved with [ReturnLR](statistics.htm).


### Zorro 2.35 (February 2021)


- The account limit of the free Zorro version was raised from $7000 to
	$15,000.

- External optimization algorithms can be used with the
	[parameters](objective.htm) function (Zorro S required).

- Prices of open option trades are not anymore updated outside market hours when
	[BR_SLEEP](barmode.htm) is set..

- Zorro's exit code can be set with the [ExitCode](exitcode.htm)
	variable.

- The backtest speed was increased due to changes to the print function
	and the memory management.

- The [seriesO/H/L/C](price.htm) functions can be used as
	prices series parameters to indicators or functions.

- Multicore training now supports the **
	[StrategyFolder](ini.htm)** (was only partially
	implemented in the previous version).

- The [assign](renorm.htm) function converts portfolio weights
	to asset amounts.

- The [report](report.htm) function can now return a list of
	all open trades.

- Open trades can be loaded from the broker account with the
	[brokerTrades](brokercommand.htm) function.

- The [GET_TRADES](brokercommand.htm) and
	[DO_CANCEL](brokercommand.htm) commands were implemented
	in the [IB plugin](ib.htm).

- Graphics by [plotGraph](plot.htm) don't affect the chart
	scale anymore.

- [Coinigy](coinigy.htm) now supports [
	GTC orders](trademode.htm) and the [GET_DATA](brokercommand.htm) and
	[DO_CANCEL](brokercommand.htm) commands.

- [assetHistory](loadhistory.htm) can now load data from
	arbitrary sources and supports **.t2** order book data (Zorro S
	required).

- Setting [StopFactor](stop.htm) at **1** causes
	stops to be managed by the broker only.

- Shifting dynamic [series](series.htm) can be controlled with
	the [NOSHIFT](mode.htm) flag.

- New plugins by users: [Alpaca](alpaca.htm), [TD
	Ameritrade](tdamtrade.htm), and [Binance Futures](binancefutures.htm).

- New plugins for Zorro S: [DTN IQFeed](iqfeed.htm) and
	[Tradier](tradier.htm).

- The [assetHistory](loadhistory.htm) function now loads split
	and dividend adjusted data from **IEX**.

- [BR_SLEEP](barmode.htm) is now unaffected by
	[BR_LEISURE](barmode.htm).

- The [MT4 bridge](mt4plugin.htm) now supports the
	[GET_POSITION](brokercommand.htm) command. Re-install the bridge
	for using this command.

- The Binance plugin now returns the [TradeVal](balance.htm) of
	all open positions on account requests.

- **[GET_AVGENTRY](brokercommand.htm)** was
	implemented in the [IB plugin](ib.htm).

- The new [ZStatus](trading.htm#zstatus) script displays the live
	status of multiple accounts (Zorro S required).


### Zorro 2.30 (August 2020)


- The [IB API](ib.htm) can now return
	prices in fast mode (price type = 8) in less than 1 ms, dependent on
	setup and location.

- Charts can now be generated and updated in real time
	with the [plotChart](plot.htm) function.

- A price history folder can now be set up with the
	[History](script.htm) string.

- [Historical D1 data](loadhistory.htm)
	from IB now contains only regular trading hours.

- The **Offline** plugin can be used in [Trade]
	mode with no broker connection.

- The **PayOff** script is now
	interactive. Strike distance and expiry can be set with sliders.

- The [comboProfit](combo.htm) function
	returns the profit or loss of the current combo at a given expiration price.

- The [SLIDERS](is.htm) flag detects slider movement.

- Bar start/end times in live trading are now synchronized to an integer
	multiple of the bar period.

- The [tdm](month.htm) function counted also partial trading
	days, such as UTC Sunday 22:00. For avoiding confusion, now only 'real'
	workdays are counted.

- The chart caption can be changed with the [print](printf.htm)
	function.

- The [IB plugin](ib.htm) was modified for supporting European
	options on the ICEEU exchange.

- The [TR_AON](trademode.htm) flag enforces all-or-nothing
	order mode.

- Arbitrary content can be passed via [command line](command.htm)
	with the **-u** option.

- [contractUpdate](contract.htm) now automatically sets the
	[Multiplier](contracts.htm) when it was at 0.

- The [error](tick.htm) function can be used to sound alerts,
	send emails, or stop Zorro on warnings or errors.

- Series can be replaced with external buffers with the
	[SeriesBuffer](series.htm) pointer.

- Trades from a template can be entered with [
	enterTrade](buylong.htm).

- The [Simulate](scripts.htm) script backtests a trade list.

- For suppressing particular error messages, call [
	ignore(ErrorNumber)](errors.htm).

- Spearman [correlation](transform.htm) with arbritrary
	functions.

- New [Ehlers indicators](ta.htm): **CTI, CCYI, CCYIR,
	CCYIState**.

- [SMAP](ta.htm) calculates the mean of positive values.

- [NOWATCH](mode.htm) switches off all [
	watch](watch.htm) statements.

- [plotContract](contract.htm) and [
	plotCombo](combo.htm) plots payoff diagrams of the given option or combo.

- The [break_assets](fortrades.htm), [break_algos](fortrades.htm) statements abort asset or algo enumeration loops.

- The average profit per trade, instead of per year, is now displayed
	after a backtest.

- [MarginCost](account.htm) in the asset list can now be
	negative for a percentage. Options multipliers can be given in **LotAmount**.

- [assetSelect()](asset.htm) selects the current asset in the
	scrollbox.


### Zorro 2.25 (March 2020)


- Optimized parameters can be generated by script by setting the
	[optimize](optimize.htm) range to zero.

- [OptimalF](optimalf.htm) factors of profitable components are
	now rounded up to at least 0.001.

- A script for converting CSV to .t8 options history was added to the
	[repository](scripts.htm).

- The [OVERRIDE](loadhistory.htm) flag now also works for
	broker price sources.

- Two new indicators were added: [LSMA](ta.htm) and
	[QLSMA](ta.htm).

- Memory consumption by [PRELOAD](mode.htm) was reduced.

- The last [WFO cycle](numwfocycles.htm) is now extended to
	ensure that it includes the end date.

- **HistoryScript = "History"** in [
	zorro.ini](ini.htm) opens the [History](scripts.htm) script when clicking on a t1, t2, t6, or t8 file (Zorro S).

- The [peak](peak.htm), [valley](peak.htm), and
	[cross](crossover.htm) functions now return the bar offset of the
	last event.

- The [slope](slope.htm) and [line](slope.htm)
	functions can be used to connect points on the price curve.

- More traditional indicators: [Pivot](ta.htm), [
	Support](ta.htm), [Resistance](ta.htm), [Divergence](ta.htm).

- More traditional candle patterns: [CDLEngulfing0](candle.htm),
	[CDLOutside](candle.htm).

- The [BUSY](is.htm) flag indicates whether the broker API can
	be accessed.

- [PlotLabels](plotbars.htm) determines the x axis label
	distance on histograms.

- Text can now be plotted to the chart with [plotText](plot.htm).

- Price curves can now also be [randomized](detrend.htm) with
	the **BOOTSTRAP** and **RANDOMWALK** methods.

- The [SHAPE](detrend.htm) flag allows manipulating price
	curves in arbitrary ways for test purposes.

- Use the [call](call.htm) scheduler for running functions at
	particular events.

- The [debugger](chart.htm) now displays a list of open trades.

- Options expiration time of day can now be set with [
	ExpiryTime](contracts.htm).

- New time series functions: [SemiMoment](transform.htm),
	[Sharpe](ta.htm), [Sortino](ta.htm).

- The **Sortino ratio** was added to the
	[performance report](performance.htm).

- The [knapsack](renorm.htm) function can be used to manage a
	stock portfolio with small capital.

- The [ScholzBrake](lots.htm#scholz) and [
	LossGlobal](winloss.htm) variables can step around the new German trader tax.

- The Scholz tax is now included in the [
	performance report](performance.htm).

- The C functions **strcpy_s**, **sprintf_s**,
	**strcat_s**, **memcpy_s** have been added to
	[stdio.h](litec_h.htm).

- New functions for options: [contractMargin](contract.htm),
	[comboMargin](combo.htm), [comboType](combo.htm).

- [OBV](ta.htm) has been added to the indicators.

- The [invalid](invalid.htm) function helps debugging
	arithmetic errors.

- [GET_CALLBACK](brokercommand.htm) sets a plugin supplied
	callback function.

- Historical data from [CryptoCompare](loadhistory.htm) is now
	automatically appended to existing data, if any.


### Zorro 2.20 (November 2019)


- The [once](once.htm) function registers the first time when a condition became true.


- The [erf](cdf.htm) function returns the interval probability. 

- [SampleOffset](numsamplecycles.htm) can be used for per-cycle
	oversampling.

- A **Detrend** example script was added to the
	[script repository](scripts.htm).

- The price range of randomized curves ([SHUFFLE](detrend-htm)
	flag) can now be limited.

- A new [workshop 4a](tutorial_lowpass.htm) about indicator
	development has been added.

- Wrong **PIP**, **PIPCost**, or **
	LotAmount** parameters from the broker API can be fixed by
	[SET_PATCH](brokercommand.htm).

- [Zorro.ini](ini.htm) entries are now available by the
	[report](report.htm) function. [report(1)](report.htm) can now be called inside
	[evaluate](evaluate.htm).

- The [zalloc](sys_malloc.htm) function is useful for
	allocating temporary arrays.

- [BR_SLEEP](barmode.htm) or [BR_LOGOFF](barmode.htm)
	flags
	can now be set for the Z systems.

- The question "Close open trades?" at session end can be skipped with the
	[AutoConfirm](ini.htm) setting.

- Since **Oanda** now requires a unique size for stop loss orders,
	stops are now
	handled on the Zorro side.

- Variables and functions that are long outdated or deprecated are now collected in
	**[legacy.h](litec_h.htm)**, which
	can be included when needed.

- Outdated keywords moved to **[legacy.h](litec_h.htm)**:
	**Slider1-3**, **CVolatility**, **loadHistory**,
	**DDScale**, **OptCycle**,
	**reverseLong**, **reverseShort**.

- The [AccountName](script.htm) string contains the selected
	name from the [Account] scrollbox.

- The [OptionsCalculator](scripts.htm) script calculates the
	value and delta of call and put options.

- The [advise](advisor.htm) training speed has been improved
	for large training sets.

- The [flag system](mode.htm) was changed to support more than
	64 flags. All flags can now be set and read with the **set**
	and **is** functions.

- The status flags [PARCYCLE](is.htm), [FACCYCLE](is.htm),
	[RULCYCLE](is.htm) are renamed to avoid confusion
	with mode flags of the same name.

- Internal structs have been changed in version 2.19.5. Compiled scripts must be re-compiled for
	the current version.

- The command line and other system strings are now available through the
	[report](report.htm) function.

- The [SAV_STATS](loadstatus.htm) flag resumes
	[trade statistics](winloss.htm) from the previous session.

- An example for [integrating Zorro](engine.htm) in other
	software was included in the **Source** folder.


### Zorro 2.15 (July 2019)


- [Init](is.htm) is an abbreviation for **is(INITRUN)**.

- The [-quiet](command.htm) option suppresses the 3 seconds
		pause at the end of a batch run.

- An asset can be optionally preselected in the scrollbox with the [assetList](asset.htm) function.

- In the [ **TradeOptions** script](scripts.htm) now several combos can
		be selected.

- The [getvar/putvar](putvar.htm)
		functions can now store variables in the Windows registry.

- The primary exchange for [IB
		asset symbols](ib.htm) can be appended to the exchange code.

- The [strx](str_.htm) function can now
		replace text in strings of unlimited size.

- Special order types, like "market on close" etc,
		are now supported by the [IB plugin](ib.htm).

- **NaN** lines can now be filtered
		out by [dataParse](data.htm).

- **M1 bitcoin history** has been added to the
		download page.

- A list of market holidays can be passed to the
		[Holidays](sate.htm) pointer.

- The [PlotBorder](plotbars.htm)
		variable reserves space for the chart axis labels.

- The [FXCM plugin](fxcm.htm) was
		updated to the most recent API version. You'll need to unpack additional DLLs. Win XP is not supported anymore by
		FXCM.

- The **Weekend** variable
		has been replaced by [flags](barmode.htm) that are more
		flexible to use.

- New **FXCM accounts** are now
		rewarded with a [Zorro S](restrictions.htm) subscription.

- A [DLL for integrating Zorro](engine.htm) in other platforms
		is available on request.
- [Zorro instances](engine.htm) can
		now start, stop, and communicate with each other.
-
		[SET_PRICETYPE,8](brokercommand.htm)
		now loads option and futures prices faster from IB.

- The [MT4/MT5 bridge](mt4plugin.htm)
		was changed in 2.14.6. Re-install the bridge and compile the Zorro EA.

- CSV files by [print(TO_CSV)](printf.htm)
		are now generated in the **Data** folder.

- **[New Script]** will now generate a basic strategy
		template.


### Zorro 2.12 (May 2019)


- Genetic and brute force [training modes](opt.htm) are now
		available (Zorro S).

- 10 new scripts for various purposes have been added to the
		[script repository](scripts.htm).

- The [RET](ta.htm) indicator is for quickly calculating
		momentum without a series.

- The **SpecialBars** script illustrates the use of
		special bars for single-asset and multi-asset strategies.

- The [sliders](slider.htm) can now display fractional
		values.

- The Action scrollbox can now be selected
		[by script](panel.htm) and keeps the selection after the
		end of the strategy.

- A new [Z13](zsystems.htm) options trading system was
		added to the Z systems (Zorro S).


- The number of concurrent broker connections was increased from 4 to
		12.
- The [PL_BENCHMARK](plotmode.htm) flag plots the equity
		curve as a line.

- [Virtual Hedging](hedge.htm) became a S feature and the [interactive chart viewer](chart.htm)
		became a free
		feature.
-
		The [performance report](performance.htm) now contains a
		breakdown of annual and monthly returns.
-
		The **InvestCalculator** script allows investing by the
		square root rule.
-
		The [SETFACTORS](opt.htm) flag allows factor calculation by
		script.
-
		CSV files generated with the [SIGNALS](advisor.htm) flag are
		now stored separately per asset.
-
		The [Ulcer](statistics.htm) and [R2](statistics.htm)
		statistics parameters have been renamed to **ReturnUlcer**
		and **ReturnR2**.
-
		The [conv](rev.htm) function converts a float array to a var
		series.
-
		The [R2](transform.htm) function returns the coefficient of
		determination of a series.
- [dataMerge](data.htm) adds new
		data at the front of an existing dataset.
- Interest on margin loan can
		be set up with the [Interest](spread.htm) variable.
- The
		IEX exchange is now supported by [assetHistory](loadHistory.htm)
		and with the [IEX plugin](iex.htm).
- Price request can be
		switched off with the [SET_PRICETYPE](brokercommand.htm)
		command.
- The default **objective** function now rejects
		results with less than 5 trades.
- [OptimalF](optimalf.htm)
		factors are not displayed in the performance report when profit is
		reinvested.

### Zorro 2.08 (April 2019)


- The new [Python Bridge](python.htm) allows to run Python
		scripts and commands from Zorro.

- A new [Regime](scripts.htm) script was added to test
		indicator responses on market regime changes.

- The [frameSync](frame.htm) function now synchronizes also
		30-min and 4-hour timeframes.

- Get info about trading events with the [
		email](email.htm) function.

- The [plotHistory](profile.htm) helper function allows
		easier producing histograms.

- The [comboAdd](combo.htm) function adds a contract to the
		current combo.

- [comboPremium](combo.htm) calculates the premium of a
		combo.

- Stop orders can be added to IB trades with the
		[SET_ORDERTYPE](brokercommand.htm) command.

- [NumAssetsUsed](numassets.htm) counts the assets used in
		the script.

- [Live](is.htm) is an abbreviation for **
		is(TESTMODE)**.

- The [contractSellUnderlying](contract.htm) function gets
		rid of the underlying of exercised contracts.

- **[BarMode](barmode.htm) > 4** now suspends
		broker API calls when logged out.

- A new memory management reduces the memory footprint of portfolio
		systems by about 50%.

- The [LEANER](mode.htm) flag reduces the memory footprint
		by further 50% when **TICKS** is not set.

- Option premiums displayed in the log now include the ask-bid spread.

- The **[Itor](fortrades.htm)** variable
		counts asset and trade loops.

- [Symbol](account.htm) strings can now contain **'*'**
		for the asset name.

- The IB API now supports [option combinations](combo.htm)
		and[ GTC orders](trademode.htm).

- **AlgoVar2** can now be saved with the
		[SV_ALGOVARS2](loadstatus.htm) flag.

- [Warning 054](errors.htm) will now be issued when asset
		parameters from the broker API are suspicious.

- The [require](version.htm) function can be used to start
		a script only with a certain software version.


### Zorro 2.03 (February 2019)


- The [brokerAsset](brokercommand.htm) and
		[brokerAccount](brokercommand.htm) functions directly call the
		corresponding functions of the [broker API](brokerplugin.htm).

- The [Chart](scripts.htm) script opens a .t1, .t6, or .t8
		file and displays its content in a chart.

- The [CryptoCompare](loadhistory.htm) download function
		has been adapted to the new 2000 prices limit.

- **Z9** now downloads UK ETFs from Stooq (Yahoo
		sometimes delivered wrong prices for UK assets).

- [assetHistory](loadhistory.htm) now uses the current asset
		history symbol when no name is given.

- The [Centage](contracts.htm) flags automatically convert
		live or historical prices given in cents, as
		for some agricultural futures and options.

- A new [Action] scrollbox has been added. It
		can be set up in [Zorro.ini](ini.htm) or in the
		[script](panel.htm) for running Zorro tasks, external programs,
		or script functions with a mouse click.

- The [SET_PATCH](brokercommand.htm) command can now also
		override the broker API's leverage and margin cost parameters.

- The [timeOffset](month.htm) function now also supports
		bars in the future.

- The [contractUpdate](contract.htm) function can now load chains
		from any historical data, using the **Now**
		variable.

- The **.t8** format is now also accepted for historical
		price data (**History = ".t8"**). If the file contains
		different underlying prices for the same date, as for futures, their
		average is used.

- For options on futures (FOPs) the trading class can now be encoded
		in the [IB symbol string](ib.htm).

- The exchange for the current options chain can now be retrieved or
		given with the [Exchange](contracts.htm) variable.

- The **ER** and **KAMA2** indicators have
		been added to the [indicators list](ta.htm).

- The maximum size of a contract chain has been increased to 20,000
		contracts.

- [MaxLong](lots.htm) and [MaxShort](lots.htm)
		can be set to a negative number for preventing the updating of open
		trades.

- The Zorro.exe can now be assigned to files with **.t1**,
		**.t6**, **.t8** extension and automatically
		displays them in a chart.

- A name can be passed via command line to the [
		Define](cmd.htm) string.

- [PlotHeight2](plotbars.htm) can be used for determining
		the proportions of additional charts in the interactive chart viewer.

- The account is now stored per trade so that trades from multiple
		brokers or accounts can be resumed.

- The [file_appendFront](file_.htm) function now supports
		text strings.

- Options can now be combined with the [combo](combo.htm)
		functions.

- [Algo](algo.htm) identifiers ending with **":L"**
		or **":S"** now automatically suppress trades in opposite
		direction.

- The [VWAV](ta.htm) function calculates volume weighted
		average values.


### Zorro 1.96 (November 2018)


- [Stop](stop.htm) and [Trail](stop.htm) distances can
	now also be used for option contracts.

- The interactive [Chart Viewer](chart.htm) allows zooming into
	chart details and replaying the backtest in single step and slow motion (Zorro
	S).

- Level 2 data is now supported by the IB plugin with the
	[GET_BOOK](brokercommand.htm) command. Market depth data must be
	subscribed and the exchange must be coded in the asset symbol.

- The [contract.c](contract.htm) include file is now  C++
	compatible, which allows writing options trading systems with the
	[VC++ environment](dlls.htm).

- A step by step instruction for [writing strategies with
	Visual Studio](dlls.htm) was added to the manual (Zorro S).

- The [contractRecord](contract.htm) function can store the current
	option or futures chain in a historical data file in **.t8** format.

- The number of [AssetVars](algovar.htm) has been increased to
	16. The first 8 can be read from the asset list.

- The background color of a [panel button](panel.htm) can now be
	changed in the **click** function.

- Automatic daylight saving can now be switched off by adding **UTC**
	to the time zone, f.i. **UTC+1** = Central European Winter Time
	and **UTC+2** = Central European Summer Time.

- A new workshop for [options trading](tutorial_options.htm) was
	added to the tutorial.

- A negative lot parameter to a [trade](buylong.htm) function reverses
	the trade direction. This allows shorter code in some situations.


### Zorro 1.88 (August 2018)


- The [sortRank](sortdata.htm) function can encode candle patterns
	for machine learning features.

- The [file_next](file_.htm) function can enumerate file names
	in a directory.

- Multiple accounts are now supported by the [IB plugin](ib.htm).
	The account can be set up in the [account list](account.htm).

- Order flow can be analyzed with the [order book functions](ordercvd.htm).

- Broker API requests can be limited with the [MaxRequests](ticktime.htm)
	variable. The limit is automatically set by broker plugins that support the
	[GET_MAXREQUESTS](brokercommand.htm) command.

- The [Mode](transform.htm) function returns the most frequent
	value of a data series.

- The [Windows Handle](hwnd.htm) can be used for triggering events
	between Zorros or asynchronously receiving price quotes from
	[broker plugins](brokerplugin.htm).

- Option Delta can now be calculated with the [contractDelta](contract.htm)
	function.

- With the [panelFix](panel.htm) function header rows or colums
	can be determined on a scrolling panel.

- The default [BarOffset](barperiod.htm) for daily candles and
	D1 history is now set to 16:30 for preventing unwanted midnight bars.

- The [modf](modf.htm) function splits a variable in a fractional
	and integer part.

- [FROM_YAHOO](loadHistory.htm) is back! At least for the moment,
	Yahoo™ data can be downloaded again, using a 'backdoor'.

- The [dataParseJSON](data.htm) function parses OHLC prices from
	a JSON file to a **.t6** dataset.

- The [OrderDuration](timewait.htm) variable limits the duration
	of a GTC order.

- Williams' Market Sentiment Index has been added to the [
	indicator collection](ta.htm).

- [Commission](spread.htm) is now stored per trade, which allows
	to set up script-calculated commission amounts before entry or in a
	[TMF](trade.htm).

- Option trades displayed in the [chart](performance.htm) now begin
	with the strike price.

- The [COT](cot.htm) functions can be used to evaluate the
	**Commitment Of Traders** report.

- The [priceRecord](price.htm) function can be used to update price
	history files while live trading.

- Use [file_appendfront](file_.htm) for appending data to the start
	of a file.

- Different brokers and sources can now be used for trading, live prices,
	and historical prices through the [Symbol](account.htm) syntax.

- The [Z10 system](zsystems.htm) now automatically rebalances the
	cryptocurrency positions in trade mode.

- The [Binance](binance.htm) and [Bitfinex](bitfinex.htm)
	cryptocurrency exchanges are now directly supported.


### Zorro 1.83 (May 2018)


- Stock splits are now detected and can be evaluated with the
	[PriceJump](outlier.htm) variable.

- The [sortData / sortIdx](sortdata.htm) functions can now also
	sort in descending order.

- The [FXCM](fxcm.htm) plugin now also downloads bid prices in
	**.t1** files.

- The [marketVal](price.htm) function now supports bid-ask spread
	from bid prices in **.t1** files.

- Closed trades can be enumerated with [for(closed_trades)](fortrades.htm).

- The [contractCPD](contractcpd.htm) function can be used for predicting
	the underlying price from option prices.

- For finding a particular value in a time series, use the
	[findIdx](sortdata.htm) function.

- The [suspended](suspended.htm) function returns the current trading
	permission.

- Changed margin costs of open positions are now considered in the backtest.

- On no-leverage accounts, the ROI (return on investment) is displayed at
	the end.

- The [contractNext](contract.htm) function allows to enumerate
	contracts by their strike value.

- **ConnorsRSI** and SMA-based **RSI** were added
	to the [indicators](ta.htm).

- The **NFA** flag does not prevent partially closing trades
	anymore.

- The [filter](filter.htm) and [renorm](renorm.htm)
	functions can be used for array filtering and normalization.

- The [contractStrike](contract.htm) function calculates a strike
	price from Delta.

- The [TradeIsMissed](trade.htm) status can be used for generating
	adaptive orders. The [TradeTest](brokerplugin.htm) script now supports
	adaptive entries and exits.

- [BarMode](barmode.htm) flag 16 suppresses bars outside market
	hours.

- Assets and algos can be enumerated with [for(used_assets)](fortrades.htm)
	/ [for(all_algos)](fortrades.htm).

- The [results](results.htm) function can sum
	up the results of the last N trades by several criteria.

- Selecting an account from the [
	account list](accounts.htm) now also changes the assets in the Asset scrollbox.

- The [broker interface](brokerplugin.htm)
	now supports UUID strings to identify trades.

- The [Bittrex](bittrex.htm) plugin is included
	in the beta version (Zorro S).

- **Weekend = +16** now uses the bar time
	zone for allowing bar generation without setting **AssetMarket**.

- [wdatef](month.htm) now supports Unix time
	stamps with the **%t** format code.

- For quicker finding a function, a
	[list by category](funclist.htm) was added to the manual.

- [Detrend](detrend.htm) now supports
	**RECIPROCAL** mode for swapping currencies of a forex pair.

- [marketVal](price.htm) and
	[marketVol](price.htm) can now also be called in a TMF or
	[tick](tick.htm) function.

- The [dataFromQuandl](data.htm) function now
	automatically adjusts timestamps by 16 hours.

- Datasets can be truncated with [dataClip](data.htm).

- A new **Z10** system with more than 1000%
	annual return was added to the [Z systems](zsystems.htm) (Zorro S).

- The **Z3** system is now included in the
	free Zorro version.

- Crypto history in day, hour, or minute resolution can
	be downloaded from [CryptoCompare](loadhistory.htm) (Zorro S).

- Selecting an asset with the scrollbox now triggers the
	[click](panel.htm) function. The selected asset can be evaluated
	with the [AssetBox](script.htm) string.

- The [sftoa](str_.htm) function can display
	prices with an adaptive number of digits.

- The [Coinigy](coinigy.htm) plugin is included
	in the beta version (Zorro S). Coinigy allows algorithmic trading with many
	digital currency exchanges.

- The new **History** script displays the
	content of **.t1**, **.t6**, or **.t8**
	files (Zorro S).

- The [Edit] button now also
	opens the asset list after a test if the script used special assets.

- Portfolio weights can be generated with the
	[distribute](renorm.htm) function.


### Zorro 1.74 (January 2018)


- [dataParse](data.htm) is now 2x faster, and supports larger text
	fields in the target dataset (1.70.2) and a start and end record (1.70.3).

- The [ContractRow](contracts.htm) variable allows easy expansion
	of option contracts with further fields in an extra dataset.

- Colors can be made brighter or darker with [colorScale](color.htm).

- A negative **Capital** amount allows backtests without margin
	call detection.

- The [stridx](str_.htm) function can be used for indexing arrays
	or datasets with asset or algo names.

- Up to 4 different brokers or price sources can now be simultaneously connected
	by [asset/account list](account.htm) entries (1.70.6, Zorro S required).

- A page about [Broker Arbitrage](brokerarb.htm) was added to the
	manual.

- The [_POS](trouble.htm) macro helps finding the location of error
	messages in the script.

- The [GET_MAXTICKS](brokercommand.htm) broker command allows downloading
	historical data in bigger chunks than 300 ticks (1.71.2).

- Indicators can now be loaded from CSV time series with the
	[dataFromCSV](data.htm) function.

- The [dnorm](cdf.htm) function returns the probability of a variable
	in a Gaussian distribution.

- The [strtr](str_.htm) function returns a string identifying a
	trade.

- The currency symbol and number of decimals for account values can now be
	set up with the [account list](accounts.htm) (1.71.9).

- The fill status of a trade can now be returned with the
	[BrokerTrade](brokerplugin.htm) function. The MTR4 bridge has been
	modified accordingly.

- The [R Bridge](rbridge.htm) can now also be used with a
	[strategy DLL](dlls.htm) (1.72.4).

- The [PL_ALLTRADES](plotmode.htm) flag plots trades of all assets
	in the same chart.

- Downloading [Crypto Currencies](loadhistory.htm) from Coinbase
	and Bitfinex is now supported through the Quandl Bridge (Zorro S required).

- Limiting trades to local market hours can now be set up in the
	[BarMode](barmode.htm) variable.

- Panel cells can be merged with [panelMerge](panel.htm).

- The stop distance of pool trades can be set with [StopPool](stop.htm).

- The **IB Bridge** now downloads prices in 1500-tick packets,
	which increased the download speed by up to 30%.

- The **IB Bridge** now supports the
	[SET_PRICETYPE](brokercommand.htm) command with parameters 1 (quotes)
	and 2 (trades).

- The [Download script](history.htm) was pimped up. It is now easier
	to use and offers more features.

- [Perceptrons](advisor.htm) with an analogue output can now be
	generated.

- The start date of the [Z8 and Z9 systems](zsystems.htm) is now
	automatically adapted to the availability of historical data.

- Unix time stamps in milliseconds are now supported for
	[dataParse](data.htm) (1.73.4).

- Since Support got permanently complaints by former MTR4 users about the
	'wrong lot size', position sizes can now be given as [Amount](lots.htm),
	similar to MTR4 lots.

- The [TrainMode](opt.htm) variable got a new flag to generate
	**OptimalF** factors separately per WFO cycle.

- Broker connections can now be set up per asset in the
	[asset list](account.htm), allowing simultaneous connection to several
	brokers (Zorro S).


### Zorro 1.66 (September 2017)


- [Statistics data](statistics.htm) can now be evaluated at the
	end of the strategy.

- The [dataSaveCSV](data.htm) function can be used for saving datasets
	in arbitrary CSV formats.

- The [PercentRank](transform.htm) function was added.

- The "reverse" helper functions have been replaced by the
	[MaxLong](lots.htm) / [MaxShort](lots.htm) variables.


- Option history files in **.t8** format are now automatically
	loaded by [contractUpdate](contract.htm).

- Commission is now automatically reduced by 50% on expired options.

- A [cheat sheet](format.htm) with often used codes was added to
	the manual.

- **TO_ALERT** and **TO_CSVHDR** modes have been
	added to the [print](printf.htm) command.

- The Zorro panel can now be resized, allowing more space for the message
	window.

- The [-stay](command.htm) command line option leaves the Zorro
	window open after running a script.

- The [Cold
	Blood Index](http://www.financial-hacker.com/the-cold-blood-index/) has been implemented through the [verify](ddscale.htm)
	function. It is now displayed every day in live trading by the Z systems.


- Log files from strategy variants can be more conveniently compared by numbering
	them with [LogNumber](numtotalcycles.htm).

- [Plot](plot.htm) curves are now automatically exported to spreadsheets
	in the CSV format.

- The **Margin** and **Risk** sliders of the
	[Z strategies](zsystems.htm) have been replaced by a **Capital**
	slider similar to Z8.

- The [Z8](zsystems.htm) system got several improvements (heatmap
	display, sell priority, weight adaption).

- A new system [Z9](zsystems.htm) was added to the Z systems, based
	on Antonacci's "Dual Momentum".

- The [advise](advisor.htm) function now accepts signals in an
	array with arbitrary length.

- The generated perceptron, decision tree, and price pattern rules use now
	double precision variables.

- Zorro now distinguishes rejected [Pool Trades](hedge.htm) from
	externally closed Pool Trades.

- The [Notepad++](npp.htm) editor was integrated in Zorro as a
	replacement of the SED editor.


### Zorro 1.60 (July 2017)


- Price data can now also be [downloaded](loadhistory.htm) from
	**Google Finance**, **AlphaVantage**, and **
	Stooq**.

- The [IG](ig.htm) plugin by Daniel Lindberg has been added to
	the Plugins folder.

- The **Payoff** script can be used for calculating profit
	diagrams of option combinations.

- The [assetList](asset.htm) function now also sets the Asset scrollbox
	to the selected asset list.

- The [MTR5 platform](mt4plugin.htm) is now supported with the
	MTR5 bridge 1.15

- The outlier detection can be adjusted with the [Outlier](ticktime.htm)
	variable.

- The [Stoch](ta.htm) function now also supports variable time
	frames.

- **[StartDate = NOW](date.htm) **can be used for
	strategies that do not run permanently, but are started periodically, f.i. for
	modifying a portfolio.

- [AssetMarket](assetzone.htm) can be used for skipping all bars
	outside market hours in local time.

- Z8 was changed to trade not anymore at a fixed day of the month. The next
	trading day is now displayed in trade mode.


### Zorro 1.58 (May 2017)


- If an asset is not available from the broker, it can be downloaded from
	Yahoo or Quandl by using special [Symbol](account.htm) codes.

- The [callback](funclist.htm) function can be called from the
	[broker plugin](brokerplugin.htm), allowing the script to react immediately
	on certain API events.

- In [HFT mode](fill.htm), high frequency trading systems can be
	simulated with pre-set lag.

- Various plot flags can be set with the [PlotMode](plotmode.htm)
	variable.

- A [StopFactor](stop.htm) can now be determined for the Z systems
	and allows disabling broker stops.

- The [Oanda plugin](oanda.htm) now also supports Oanda API V2.0.


- Text can now be assigned to the [Result] button
	with [panelSet](panel.htm).

- The [IB plugin](ib.htm) now supports trade volume also in live
	data.

- Seconds in [.csv files](data.htm) and [wdatef](data.htm)
	fields can now have decimals and are parsed with 1 microsecond resolution.

- A new [lowpass](filter.htm) filter function was added that does
	not use a series.

- The Quandl **WIKI** database is now supported by
	[assetHistory](loadhistory.htm).

- A user-developed [Dukascopy](dukascopy.htm) plugin has been included.


### Zorro 1.54 (February 2017)


- Functions for [loading arbitrary data](data.htm), such as option
	chains, futures, order book content etc. from CSV files have been implemented.

- The [wdatef](month.htm) function parses time/data parameters
	from formatted strings.

- The [dataFromQuandl](data.htm) function can access Quandl™
	datasets for backtests as well as for live trading ([Zorro
	S](restrictions.htm) required).

- Up to 8 additional asset specific values or strings can be stored in the
	[asset list](account.htm).

- The [contract](contract.htm) functions are for trading and analyzing
	options and futures.

- Real money accounts can now be connected in read-only mode with an
	[account list](account.htm).

- The **EXTRADATA** flag of version 1.50 was replaced by the
	[LEAN](mode.htm) flag that has the opposite meaning. Historical data
	is now stored in noncompressed format by default.

- Option and future chains can be restricted to certain trading classes with
	the [SET_CLASS](brokercommand.htm) command.

- The IB bridge now supports the [SET_LIMIT](brokercommand.htm)
	command for getting a better fill price.

- The IB bridge now supports stock CFDs (type **STKCFD**).


- Prices are now stored with 5 digits precision in the trade spreadsheet.


- Option trades are now based on the real options ask price instead of the
	extrinsic price.

- The [MinutesPerDay](lookback.htm) variable prevents "Not
	Enough Bars" errors of assets that are only traded a few hours per day.


- The [between](between.htm) function now also works for cyclic
	ranges.

- [PlotPeriod](plotbars.htm) sets the update rate of the chart
	on the trade status page.

- The [OrderLimit](stop.htm) variable allows sending limit orders
	for filling with best price within a time period.

- The [season](season.htm) indicator can be used to predict price
	movements based on seasonal strength.

- [qnorm](cdf.htm) is the inverse of the [cdf](cdf.htm)
	function.

- Assets can now be excluded from Z3 and Z7 with the
	[Exclude](zsystems.htm) line in z.ini.

- The equity or balance curve of a test run is now also exported in CSV format
	for further evaluation.

- MTR4 bridge 1.13 now supports a [lock command](brokercommand.htm)
	for preventing that trade parameters sent by different Zorro instances interfere
	with each other.


### Zorro 1.50 (September 2016)


- Orders for binary options and other special order types can now be sent
	via MTR4 bridge with the [SET_ORDERTEXT](brokercommand.htm) command
	(V 1.47.1).

- [Currency strength](ccy.htm) functions have been added for detecting
	currency trends that affect several markets (V 1.47.2).

- Live trading results can be verified by [retesting](retraining.htm)
	(V 1.47.2; [Zorro S](restrictions.htm) required).

- Live trading systems can retrain automatically in predefined intervals with
	the [ReTrainDays](date.htm) variable (V 1.47.2;
	[Zorro S](restrictions.htm) required).

- The sliders can now be moved with [slider(num,pos)](slider.htm)
	commands (V 1.47.2).

- The default data format was changed from **.bar** to
	[**.t6**](history.htm) for including volume and other
	data streams in the price history (V 1.47.2). **.bar** data can
	still be used.

- With the [marketVol](price.htm) function, trade or tick volume
	of an asset can be used in a trading algorithm (V 1.47.3; Zorro S only).


- The [Fill](fill.htm) mode determines how orders are filled in
	the simulation (V 1.47.4).

- Numbers can be passed to the [Command](cmd.htm) variable via
	command line (V 1.47.4; [Zorro S](restrictions.htm) required).


- The number of optimize steps per parameter was increased to 1000 (V 1.47.7).


- Price ticks are now internally stored in a different format that used less
	memory for large high-resolution backtests. (V 1.47.7).

- Disquieting broker messages - such as "An internal server error occurred,
	our engineers have been notified" - are now filtered out by the Oanda plugin
	(V 1.47.8).

- Three [Volatility indicators](ta.htm) are now supported - Chaikin,
	Min/Max, and StdDev based volatilities (V1.50.2).


### Zorro 1.46 (July 2016)


- The [assetAdd](asset.htm) function allows adding assets via script
	without editing the asset list.

- The [assetList](asset.htm) function loads an asset list immediately.

- Price history files can be shared among several Zorro installations when
	a [HistoryFolder](ini.htm) is set up in **Zorro.ini**.


- With the **"\r"** character in a **
	[print/printf](printf.htm)** statement that jumps back to
	begin on the current line, a running counter or similar effects can be realized
	in the message window.

- The [mouse](mouse.htm) function can be used for automated clicking "Buy"
	and "Sell" buttons on a broker's web interface.

- Individual asset lists for the [Z systems](zsystems.htm) can
	now be entered in the **Z.ini** setup file.

- A new free trading system **Z8** was added to the
	[Z systems](zsystems.htm).

- The [Oanda plugin](oanda.htm) now supports sub-accounts.

- The **LINE** flag in a [plot](plot.htm) command
	plots thick lines in the chart.

- [Change Folder] in the Strategy scrollbox selects
	strategies from a different folder.


### Zorro 1.44 (May 2016)


- The [Oanda](oanda.htm) plugin allows direct trading with Oanda™.

- Headers for authorization or other purposes can now be included in the
	[http_send](http.htm) function.

- The [TradeTest](brokerplugin.htm) script opens a panel with buttons
	for manually trading, useful for testing broker plugins.

- Files can now be selected in a dialog box with the [file_select](file_.htm)
	function.

- Clicking on [Result] during test or trading triggers
	the [click](panel.htm) function. This can be used for performing
	a calculation or plotting an interim result.

- The [IB bridge](ib.htm) was modified for downloading larger price
	history.

- The [GET_POSITION](brokercommand.htm) command is now supported
	by the IB bridge.

- The [BALANCED](advisor.htm) flag produces a balanced samples
	distribution for all machine learning algorithms.

- A set of [normalization functions](norm.htm) was added for better
	adapting indicators to machine learning algorithms.

- The [SIGNALS](advisor.htm) method exports samples for experimenting
	with them in R sessions.

- A default [neural](advisor.htm) function was included in the
	**r.h** header. The documentation now got a R example for a 'deep
	learning' strategy.

- The [Covariance](ta.htm) between two series was added to the
	indicator library.

- The [TRADESIZE](mode.htm) flag can be used for training strategies
	that rely on different trade sizes, f.i. Martingale systems.

- The [28 Currencies history](http://zorro-project.com/download.php)
	was updated until the end of 2015.

- [Day](numbars.htm) gives the current day number of the simulation.


- Optimal capital allocation among portfolio components can be calculated
	with the [Markowitz efficient frontier](markowitz.htm).

- Symbols on a histogram or statistics chart can now have individual colors.


- The [plotHeatmap](profile.htm) function can plot correlation
	heatmaps.

- The [color](color.htm) function can be used for plotting heatmaps
	or multiple color curves.

- Date and time can be printed more easily with the [strdate](month.htm)
	function.

- A set of [matrix functions](matrix.htm) was added.

- By default Zorro is now installed in the **User** folder instead
	of the **Program Files** folder.


### Zorro 1.42 (February 2016)


- The [STEPWISE](mode.htm) flag can be used for
	[
	debugging](https://zorro-project.com/manual/en/testing.htm#step) trade behavior by single stepping through a test session.

- Variables can be debugged with the [watch](printf.htm) function.


- When a script crashes, the name of the faulty function is now displayed.


- A negative [PlotBars](plotbars.htm) number zooms to the end of
	the chart.

- The [MTR4 Bridge](mt4plugin.htm) can now draw horizontal lines
	and text in the MTR4 chart window.

- The [MTR4 Bridge](mt4plugin.htm) latency time was reduced from
	~100 ms to ~30 ms by optimizing the data transfer.

- [Control panels](panel.htm) can now be defined for entering and
	displaying strategy parameters.

- The [Leverage](pip.htm) parameter was changed to reflect account
	leverage instead of buying power.

- The location of the **.trd** files moved from the **Log**
	to the **Data** folder.

- The last potentially orphaned trade is now displayed in the status page.


- The [Shannon Entropy](ta.htm) was added to the indicators.


- Price data of stocks and indices can now be downloaded from Yahoo with the
	[assetHistory](loadhistory.htm) function.

- The [Download](history.htm) script is now controlled with a panel;
	editing the script is not necessary anymore.

- Assets can now be tested even with no entry in the asset list. An error
	message will then be issued and default asset parameters will be used.

- [Trade loops](fortrades.htm) can now be executed from inside
	a [TMF](trade.htm).

- The [wdate](month.htm) function returns the date and time of
	a bar in the Windows **DATE** format.

- Trades can be simulated in an unrealistic [naive mode](mode.htm)
	for special purposes.

- Individual text editors (such as Notepad++) and chart viewers can be used
	by editing the [Zorro.ini](ini.htm) file.


### Zorro 1.40 (November 2015)


- Zorro can now trade with [Interactive Brokers](ib.htm) accounts
	through the IB plugin.

- Asset lists and account lists are now in **.csv** format for
	easier editing. **Leverage** and **Symbol** have been
	added to the asset parameters.

- Correlograms can now be plotted with the [profile](profile.htm)
	library.

- Trade slippage, magic number, and other parameters can now be set up in
	the [MTR4 bridge](mt4plugin.htm) via [
	brokerCommand](brokercommand.htm).

- The type of an asset can be determined with the [assetType](asset.htm)
	function.

- The [frameSync](frame.htm) function can be used to snychronize
	the time frame to full hours or days.

- A fixed WFO test/training time can be set up with
	[WFOPeriod](numwfocycles.htm).

- [Curves](export.htm#pnl) stores balance or equity curves during
	the training process for further evaluation.

- The [putvar/getvar](putvar.htm) functions share variables globally
	among scripts.

- The [lock](lock.htm) function can synchronize the behavior of
	multiple Zorros (Zorro S only).

- The [sort](sortdata.htm) functions can now be used without data
	length limits.

- The [randomize](randomize.htm) function can shuffle a price or
	equity curve with or without replacement.

- [Percentile](ta.htm) calculates upper or lower percentiles of
	a data series.

- [ProfitFactor](ta.htm) calculates the profit factor of a balance
	or equity curve.

- The [market](month.htm) function can be used to limit trading
	to certain hours of the day.

- The [plotData](plot.htm) function returns plot data arrays that
	can be used for further evaluation.

- Plotting data is now pre-sampled, which makes plotting huge data sets -
	f.i. a backtest of several years based on minute or second bars - up to 100
	times faster than before.

- The [BrokerAccount](brokerplugin.htm) function is now optional
	(account data is normally unavailable in a FIX API implementation).

- The [Montecarlo](montecarlo.htm) module has been integrated in
	Zorro, so an external plugin is not required anymore.

- Periodic I/O tasks can be realized with the [tock](tick.htm)
	function.

- The sample period of the [Spectrum](filter.htm) function can
	now be set up independently.

- The [Z.ini](zsystems.htm) file can now be modified while trading,
	and is updated at the begin of the next bar.

- The [Z7 system](zsystems.htm) got a modified and supposedly more
	robust algorithm.

- [loop(Assets)](loop.htm) loops over all assets from the asset
	list.


### Zorro 1.34 (released August 2015)


- WFO training time can be minimized by using [several
	CPU cores](numcores.htm) (Zorro S only).

- The Zorro window can be started minimized with the [
	-h](command.htm) command line option.

- The [AssetZone](assetzone.htm) variable allows individual time
	zones for assets in a portfolio system.

- The pattern analyzer behavior can be set up with the
	[PatternCount](advisor.htm) and [PatternRate](advisor.htm)
	variables.

- A negative [series](series.htm) length can be used for generating
	static, non-shifting series.

- The [ZigZag](ta.htm) indicator was added to the indicators list.

- Machine learning models and script parameters can now be trained at the
	same time (see [Training](training.htm)). In the previous version
	this was only possible for the integrated machine learning methods, but not
	for the general **NEURAL** method.

- The [bar](bar.htm) function allows user-defined special bars
	such a Range Bars or Renko Bars.

- Training parameters now really produces a HTML file with parameter histograms
	(in the previous version this was not yet fully included).

- The [R lectures](Lecture%201.htm) by Harry Georgakopoulos have
	been included in the Zorro documentation.

- Zorro will now detect margin calls when [Capital](lots.htm) is
	set.

- The [seed](random.htm) function can initiate a deterministic
	random number sequence.

- The [HH](ta.htm) and [LL](ta.htm) functions now also
	accept a bar offset.

- The [Ichimoku](ta.htm) indicator was added to the collection.


- The [TO_CSV](printf.htm) print target prints into a CSV file.


- The [strmid](str_.htm) function returns a substring from a string.


- The asset list **AssetsCur.dta** contains all 28 major currency
	pairs.

- Price history of all 28 major currency pairs is available on the download
	page.

- The [Z2](zsystems.htm) system has been improved and got better
	exit algorithms and a new counter trend algo (A2).

- The new [Z7](zsystems.htm) system, based on the machine learning
	algorithm from [Workshop 7](tutorial_pre.htm), was included.


### Zorro 1.32 (released June 2015)


- The [R br](rbridge.htm)[idge](rbridge.htm) runs R
	functions from lite-C scripts and allows coding a trade strategy completely
	in R, using the newest and sexiest AI algorithms.

- [Verbose](verbose.htm) = 30 now stops the blackbox recording
	at the first error.

- The [strw](str_.htm) function converts strings to wide character
	strings.

- The [strf](str_.htm) function returns a formatted string.


- The [strx](str_.htm) function replaces sub-strings in a string.


- The [TO_FILE](printf.htm) and [TO_ANY](printf.htm)
	print target prints messages to the log file and window in all modes.

- The [TICKS](mode.htm) mode was changed. Ticks are now executed
	in the order of their time stamp, not sorted by asset or trade as before. This
	makes testing slower, but removes the special restrictions for tick functions,
	TMFs, and virtual hedging. The old testing method can still be used by setting
	the [FAST](mode.htm) flag.

- The [rev](rev.htm) function reverses a series so that it now
	starts with the oldest data.

- The [SHUFFLE](detrend.htm) flag randomizes a price curve and
	thus helps determining if profit is caused by a real edge or by artifacts or
	randomness.

- The [plotWFOCycle](profile.htm) and [plotWFOProfit](profile.htm)
	functions can be used for analyzing the profit curve over several WFO cycles.

- The [BarZone](assetzone.htm) variable can be used to shift daily
	bars to a certain local time zone.

- [Chaikin Volatility](ta.htm) was added to the standard indicators.


- The [BINARY](mode.htm) flag enables the simulation of binary
	trading.

- [Training](training.htm) now plots all parameter charts in a
	HTML page, also for portfolios and WFO.


### Zorro 1.30 (released April 2015)


- The [OptimalFRatio](optimalf.htm) variable modifies **OptimalF**
	factors for preventing large component margin differences in portfolio systems.

- For scalping strategies, [bar periods](barperiod.htm) down to
	100 ms are now possible with Zorro S. The **BarPeriod** variable
	is now of type **var** instead of **int** (check possible
	compatibility issues, f.i. in print/printf statements).

- Asset specific parameters can be stored in the [AssetVar](algovar.htm)
	variables.

- All [Z systems](zsystems.htm) can now be retrained with Zorro
	S by clicking the [Train] button (even while trading).
	Price history of all assets from 2008 and above must be available in the
	**History** folder. The recent prices are updated and the parameters
	of the last WFO cycle are trained. Retraining the Z systems is normally not
	necessary, but was requested by many users.

- Several small improvements have been implemented in the
	[Z systems](zsystems.htm), among them different **OptimalF**
	factors for the backtest and for live trading, and a different profit lock method.

- The [Z3 system](zsystems.htm) now also trades US indexes.


- A chart with the current equity curve and other information is now included
	in the [trade status page](trading.htm).

- If the trade volume is controlled by setting both [Margin](lots.htm)
	and [Lots](lots.htm), the **Lots** variable now determines
	the minimum number of lots per trade. Trades can be automatically skipped when
	Margin is below the minimum.

- The [backtest](testing.htm) can now use T1 (tick based) historical
	price data.

- The [assetHistory](loadhistory.htm) function can now be used
	to produce T1 price history files.

- The [seconds](month.htm) function is now of type **var**
	instead of **int** (check possible compatibility issues, f.i. in
	print/printf statements). Its fractional part contains fractions of a second
	in milliseconds precision.

- The user-supplied [](evaluate.htm)[tick](tick.htm)
	function can be used to evaluate incoming price quotes.

- The [AutoCompile](ini.htm) flag determines whether scripts are
	always compiled, or only when they were modified.

- [Plot](plot.htm) names beginning with '#' won't appear in the
	chart legend.

- The test performance can now be further evaluated with the user-supplied
	[evaluate](evaluate.htm) function.


- The **[UO](ta.htm)** (Universal Oscillator) by John
	Ehlers was added to the indicator library.

- The **Risk** column of the [status page](trading.htm)
	now displays the current risk of a trade instead of the initial risk.


### Zorro 1.28 (February 2015)


- The **[WebFolder](ini.htm)** variable can now be
	set up globally for displaying live trade status on a web site.

- The [strtext](str_.htm) function can be used to read strings
	from an **.ini** file.

- The [DPO](ta.htm) oscillator was added to the TA functions.


- The [AGC](transform.htm) and [EMA](ta.htm) functions
	now also accept an alpha parameter instead of a time period.

- Some Zorro properties - for instance, the automatic deleting of old log
	files - can now be set up in the [Zorro.ini](ini.htm) file.

- The commission per asset can now be set up in the **
	[AssetsFix.csv](account.htm)** file and by script in the
	[Commission](spread.htm) variable. The simulation now simulates a
	spread/commission account, instead of a pure spread account.

- In the SNB floor removal aftermath, many brokers reduced their maximum leverage
	from 400:1 or 200:1 to 100:1. The simulated default account (**AssetsFix.csv**)
	was also changed to 100:1 leverage, which affects the profit of most systems.

- The **Z4** and **Z5** systems are expired and
	have been removed from the strategy pool.

- The [Z3 system](zsystems.htm) now also got an equity curve trading
	mechanism.

- The currently profitable and suspended components of the **Z12**
	system are now displayed in a [asset/algo matrix](zsystems.htm) with
	green and red rectangles.


### Zorro 1.26 (October 2014)


- The number of open lots per asset can be evaluated with the
	[LotsPool](winloss.htm) and [LotsPhantom](winloss.htm)
	variables.

- The Market Meanness Index ([MMI](ta.htm)) was added to the indicator
	library.

- Haiken Ashi prices ([HA](ta.htm)) were added to the indicator
	library.

- The Z systems have been improved and retrained. New algorithms have been
	added to the Z4 and Z5 systems for working with very low price volatility.


### Zorro 1.24 (June 2014)


- The [AssetFrame](assetzone.htm) variable can be used to skip
	quoteless bars of assets in a portfolio system.

- The [TradeCosts](scripts.htm) script lists the relative trade
	costs of all main assets.

- The **Script** scrollbox now 'remembers' the last selected
	script.

- [Hedge mode 5](hedge.htm) now minimizes the number of open trades
	by closing trades partially if required.

- [exitLong/Short](selllong.htm) can now close trades partially.


- The **MTR4 bridge** and the **FXCM plugin** have
	been adapted to partially closing trades.

- [TrailSpeed](stop.htm) raises the stop faster before breakeven,
	this way preventing that a winning trade turns back into a loser.

- The [Hurst exponent](ta.htm) can determine trending state of
	a price curve.

- The [Alligator](ta.htm) indicator was added to the library.


- The [predict](predict.htm) function can predict crossovers several
	bars before they happen.

- The [Momentum](crossover.htm) variable indicates the 'strength'
	of crossovers, peaks, or valleys.

- The [saveStatus](loadstatus.htm)/[loadStatus](loadstatus.htm)
	functions can preserve variables, open trades, and slider positions when the
	system is stopped or restarted.

- The [AlgoVar](algovar.htm) variables are now automatically saved,
	thus keeping their content when a trading system is stopped or restarted.


- Invalid [Margin](lots.htm) values are now indicated with an error
	message.

- The [NFA](mode.htm) flag is now ignored in training mode.


- While trading, Zorro now displays a detailed lists of open trades and performance
	statistics in a HTML file that is updated every minute.


### Zorro 1.22 (April 2014)


- The [MTR4 bridge](mt4plugin.htm) was updated to version 1.3 that
	supports MTR4 version 600 and above.

- The [Multisession plugin](account.htm) allows to trade with multiple
	brokers, instances, and accounts even with the free Zorro version.

- Placing the stop level at the wrong side of the price in a TMF is now automatically
	corrected.

- The [ATR](ta.htm) function now adapts to the **TimeFrame**.


- A new [Virtual Hedging](hedge.htm) mode allows to combine trades
	opened on the same bar to a single net trade.

- The [Keltner Channel](ta.htm) was added to the indicator library.


- The [PlotDate](plotbars.htm) variable can be used to zoom the
	chart to a certain date.

- The [print](printf.htm) function can print to various targets,
	f.i. to a message box or to the performance report.

- Zorro now only logs in to the broker when in trade mode. In test or train
	mode, missing assets or price data will produce an error message. The
	[Download](scripts.htm) script now needs trade mode for updating
	prices or asset data.

- The [exec](exec.htm) function can be used to open an external
	program, document, URL, or batch file.

- A [Monte Carlo plugin](montecarlo.htm) is now available for a
	Monte Carlo analysis of strategy scripts and external trade lists.

- The annual return is now calculated from the maximum margin instead of the
	average margin. This produces slightly more pessimistic returns.

- The **R2** coefficient that measures equity curve linearity
	is now included in the [performance report](performance.htm).

- A small example script for converting **.csv** price history
	files to Zorro's **.bar** format was added (needs the **file_write**
	function).

- The [History](script.htm) string can be used for selecting between
	different sets of historical data files.

- The [file_write](file.htm) function can be used to store the
	content of a string, series, or array in a file.

- The [NumInRange](filter.htm) function can be used to generate
	price distribution statistics while trading.

- The [ShannonGain](filter.htm) indicator calculates the expected
	gain of the next bar period, based on Shannon probability.

- A description of using NeuroShell™ and other DLL-based indicators
	for Zorro was added to the [conversion](conversion.htm) chapter.


- Trade management functions ([TMF](trade.htm)) can now be triggered
	by entry or exit limits, thus allowing for additional entry/exit conditions
	or trade chains.

- [TickSmooth](ticktime.htm) can remove outliers from incoming
	price ticks.

- The [TickTime](ticktime.htm) variable can be used to save CPU
	resources by defining a minimum time between script executions.

- The [plotProfit](profile.htm) functions plot the daily, weekly,
	monthly, or quarterly profit or loss in the price chart.

- The [Z5 system](zsystems.htm#z5) got a new algorithm for the "Stop"
	slider that re-enters trades closed due to the risk limit. This greatly improves
	the profit in situations when the risk limit is exceeded.


### Zorro 1.20 (November 2013)


- The [PRELOAD](mode.htm) flag allows loading lookback price data
	from the price history on trade start.

- The [DominantPhase](filter.htm) function can detect turning points
	of the dominant cycle in a price curve even before they happen.

- The [account selection system](account.htm) was implemented for
	multiple accounts and/or multiple MTR4 clients (Zorro S only).

- A new FXCM plugin is available where the wrong trade profit issue is fixed,
	so the [SET_PATCH](brokercommand.htm) command is not required anymore.


- Bar charts by [plotBar](plot.htm) are now automatically aligned
	so that the chart always starts with the first bar.

- The [MTR4 bridge](mt4plugin.htm) now supports multiple MTR4 instances
	on the same PC (Zorro S only). To connect to a particular MTR4 account, either
	the account number can be manually entered in Zorro's [User]
	field, or the [account selection system](account.htm) can be used.


- The [-d](command.htm) command line option allows to pass a
	**#define** statement to the script (Zorro S only). This way many
	different tasks can be automatized with the same script.

- The [ALLCYCLES](mode.htm) flag produces a portfolio analysis
	of all sample cycles.

- The [plot](plot.htm) command now supports plotting different
	symbols in the chart.

- A price data gap check can be activated with the [GapDays](date.htm)
	variable.

- New indicators by John Ehlers ([HighPass2](filter.htm),
	[StochEhlers](ta.htm)) have been converted to C by DdlV, together
	with an example script of a trade system.

- A [Filter](scripts.htm) script has been added for testing and
	displaying Zorro's [spectral filter](filter.htm) functions.

- The sine and square wave generators can now produce hyperbolic chirps for
	filter testing.

- [Margin](lots.htm) at **0** now prevents trades;
	previously 1 lot was opened, which was a common source of mistakes.

- A backup of the **.trd** file is now stored at trade start.


- Several different money management methods are now discussed at the end
	of [workshop 6](tutorial_kelly.htm).

- A [Gap](scripts.htm) script was added as an example for a simple
	gap trading system.

- The [Z5 system](zsystems.htm#z5) was improved for adapting to
	periods of low volatility.

- The new [Z4 system](zsystems.htm#z5) was especially designed
	for minimal budgets in the range of $100 .. $400.


### Zorro 1.16 (September 2013)


- The [-quiet](command.htm) command line flag suppresses message
	boxes.

- [FTP](ftp.htm) and [HTTP](http.htm) functions have
	been added for accessing the content of websites or sending emails or files
	to or from remote servers.

- A new [Virtual Hedging](hedge.htm) mode was implemented and replaces
	the **HEDGING** flag. It can greatly reduce the market exposure
	and the trade duration, and improve profit due to smaller trade costs.

- A drawdown chart was added to the [performance
	chart](performance.htm).

- Chart colors can be individually set up with the [color](colors.htm)
	variables.

- The contribution weights of portfolio components are now listed in the
	[portfolio analysis](performance.htm).

- New trades can now be opened from inside a [TMF](trade.htm).


- The [Simulate](scripts.htm) script simulates a trade system by
	importing trades from a .CSV file.

- Entry and exit time of a trade are now stored with tick precision in the
	.CSV file (previously it was with bar precision only).

- Some users had problems to set up a trading system on a VPS, so a
	**VPS installation service** was added to the download page.


- The [Z5](zsystems.htm) system now uses virtual hedging.


### Zorro 1.14 (August 2013)


- While trading, a click on [Result] prints a list
	of open trades with entry, current, and stop prices.

- The [login](login.htm) function can be used for temporarily logging
	out from the broker.

- The [memory](memory.htm) function can be used for determining
	the current memory footprint of the script, and for finding memory leaks.


- The [reverse](buylong.htm) functions are convenient for limiting
	the number of trades. Their use is explained in
	[workshop 5](tutorial_fisher.htm).

- The [msg](printf.htm) function can now be used for modeless message
	boxes, useful for trade alerts without interrupting the script.

- The stop loss distance is now displayed in the daily profit/loss reports
	with [Verbose](verbose.htm) >= 2.

- [OptimalF](optimalf.htm) factors are now also calculated for
	long and short trades together. This gives a more precise result than averaging
	the long and short OptimalF factors.

- A [seconds](month) function was added for evaluating intrabar
	time.

- The [OrderDelay](timewait.htm) variable can be used for improving
	profits by entering trades at the optimal moment.

- A step by step description of adding new assets and downloading price data
	was added to the manual.

- The [Capital](lots.htm) variable allows to set up an initial
	capital and calculate the CAGR.

- The [advise](advisor.htm) function can now generate trading rules
	for multiple assets and algos.

- The [BarPeriod](barperiod.htm) variable can now be set from an
	[optimize](optimize.htm) call, except for WFO.

- [TimeFrame](barperiod.htm) can now generate individual time frames
	that are aligned to external events.

- [assetHistory](loadhistory.htm) can now be used for updating
	or adding new assets without downloading historic price data.

- The state of the input sliders are now stored together with the open trades,
	and restored when trading is resumed.

- The state of the Account scrollbox is now preserved when Zorro is restarted.


- The [BarMode](barmode.htm) variable can now be set to **
	2** for preventing that bars end during the weekend.

- The [Verbose](verbose.htm) variable can now be used to set up
	message verbosity and diagnostics mode via script. It is also added to the
	[Z.ini](zsystems.htm) file for the included systems.

- The **diag.txt** file is now separately stored for every strategy.


### Zorro 1.12 (July 2013)


- Slippage is now recorded while live trading, and displayed in the
	[performance report](performance.htm) in total and per trade.


- An additional algorithm (VO) was added to the Z1 system, increasing the
	annual return to about 280%

- After 6 months live test the [Z3](zsystems.htm#income) and
	[Z5](zsystems.htm#income) trade systems have been released.

- C source generated by machine learning functions is now stored in
	**.c** files instead of **.rul**.

- The [plotMAEGraph](profile.htm) function can produce MAE distribution
	graphs and similar charts.

- The [plotGraph](plot.htm) function draws lines and polygons in
	a chart.

- The [DOT](plot.htm) type can be used for plotting a dotted curve.


- The [Trail](stop.htm) distance can now be negative for raising
	the stop loss on any bar regardless if the trade is in profit or not.

- Due to an internal loop optimization, trades are now entered faster, thus
	reducing slippage.

- The [MUTE](mode.htm) flag prevents playing sounds (in the case
	that Zorro trades from your bedroom).

- [NumTotalCycles](numtotalcycles.htm) can be used to repeat a
	full simulation cycle many times.

- The [pattern analyzer](advisor.htm) can now generate 'fuzzy patterns'
	with the **FUZZY|PATTERN** method.

- The [pattern analyzer](advisor.htm) can now generate pattern
	finding functions in C that can be exported to other platforms.

- The **equalF** and **eq** functions have been
	added to the [fuzzy logic](fuzzy.htm) set.


### Zorro 1.10 (May 2013)


- Zorro can now run as a MTR4 expert advisor using the
	[MTR4 Bridge](mt4plugin.htm).

- The [Spectrum](filters.htm) function can be used to find hidden
	cycles in a price curve.

- A new [workshop](tutorial_pre.htm) was added for trading with
	machine learning algorithms.

- AI rules and strategy parameters can now be generated at the same time.


- The [PATTERN](advisor.htm) analyzer automatically finds profitable
	candle patterns for price action trading.

- The [FrameOffset](barperiod.htm) variable allows to generate
	trade signals at different times within the same time frame of a multi time
	frame strategy.

- The [-diag](command.htm) command line option can be used for
	finding the reason of a crash or similar problem that terminates the script.


### Zorro 1.06 (March 2013)


- The **AVG** flag now allows to [plot](plot.htm)
	a value as an average curve over all oversampling cycles.

- A **Laguerre** filter was added to the [
	filters](filter.htm).

- Comparing a function pointer with a **var** or **float**
	value - this can happen when forgetting the () of a function call - will now
	generate a compiler error.

- The [info](printf.htm) and [progress](progress.htm)
	commands display text and color signals in Zorro's info window and progress
	bar.

- Zorro can now be started from external programs with
	[command line options](command.htm).

- [Seasonal analysis functions](profile.htm) have been implemented.
	They are also be available as an add-on for Zorro 1.05.

- The **Z12**, **Z12fx**, and **Z12nfa**
	combined strategies have been removed because they were found less profitable
	than trading Z1 and Z2 separately. Reason is an internal mechanism that evaluated
	open trade profits for trade decisions, which does not work well across opposite
	strategies such as the Z1 trend trading and the Z2 counter trend trading systems.


### Zorro 1.05 (January 2013)


- The **Total down time** - the time spent below a preceding
	equity peak - is now displayed in the [performance
	report](performance.htm).

- The [timer](timer.htm) function can be used for precisely determining
	execution times.

- Asymmetric slippage can be simulated by setting the [
	Slippage](spread.htm) variable to a negative value.

- [dayPivot](day.htm) calculates the pivot point of the previous
	day.

- The stock exchange working hours for the [day](day.htm) functions
	can be changed through the variables **StartMarket** and
	**EndMarket**.

- The week start and end time can be changed through the variables **
	StartWeek** and **EndWeek**.

- The [DIAG](mode.htm) flag prints the execution time for opening
	and closing positions into the log file.

- The [TICKS](mode.htm) flag now also handles entry limits with
	per-tick resolution.

- [Trade functions](trade.htm) can now also be used for individual
	entry limits.

- Price history files are not anymore automatically downloaded at the begin
	of a new year - this confused beginners and was a bad idea anyway. Instead the
	[assetHistory](loadhistory.htm) function was implemented.

- A new broker plugin with the ForexConnect™ API interface has been
	implemented. It provides a more stable connection than the previously used Order2Go™
	broker plugin.

- Logging in to the broker with several Zorro instances on the same PC will
	now generate an error message.

- The **Z1** / **Z2** system components are now
	optionally filtered with the results of an out-of-sample test with the real
	trading parameters. This reduces the backtest performance, but should improve
	the real trading performance.


### See also:

[Zorro Home](https://zorro-project.com),
[Get Started](started.htm), [Bug History](bugs.htm), [Brokers](brokers.htm),
[Tutorial](tutorial_var.htm)


[►
latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
