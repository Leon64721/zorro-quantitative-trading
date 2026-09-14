# History of Bugs | Zorro Project

Source: https://zorro-project.com/manual/en/bugs.htm

History of Bugs | Zorro Project


# Bug History


Zorro is one of the most stable and robust development tools, and we're
going to great lengths for keeping it that way. New implemented functions pass
multiple tests for making sure that they work as described. Any new Zorro release
is beta tested for several weeks by strategy developers and users, thus ensuring that it has no obvious
or severe bugs. Still, software can never be 100% bug-safe ([click for proof](#proof)).
Below is a list of all bugs ever found in any Zorro release.


Since Zorro serves as a frontend to your script, it's no problem to crash it,
or let it behave
strange. This is not a Zorro bug -
read
under [Troubleshooting](trouble.htm) how to fix bugs in your script.
If you need help, subscribe a
[support ticket](https://zorro-project.com/docs.php)
and contact Zorro Support. If you've encountered one of the real Zorro bugs
listed below, either use
the described workaround, or better, get the fixed version on the
[Download page](https://zorro-project.com/download.php). If you found
a previously unknown bug in the latest Zorro release, please contact
[support@opgroup.de](mailto:support@opgroup.de). Please describe how
to reproduce the problem, and always include the script, the log, and all related
data such as asset list, asset history, or external logs. Please do not send
screenshots, videos, or photos that you took from your monitor (unless we
ask
for them). Of course you need no support ticket for bug reports. Real bugs are normally fixed within 2-3 days.

### Zorro 3.11 list of bugs or issues


- In the **dataSaveCSV** output the comma between fields 9
	and 10 was missing (all Zorro versions; fixed in Zorro 3.12.3).
- The asset
	list **AssetsZ9E.csv** contained a wrong symbol for DBXD (all
	Zorro versions; fixed in Zorro 3.12.4).

### Zorro 3.01 list of bugs or issues


- Under some circumstances, Z12+ and Z6+ switched to a different time zone
	dependent on the broker connection (set to UTC in Zorro 3.11).
- Stooq has
	discontinued their data download services, which also affected the default
	asset lists of some Z systems. There is currently no free data service for
	D1 data (let us know if you know one!). You can subscribe data from AlphaVantage, EOD, or your broker.
- The
	**Strategy** folder was limited to 1024 files (unlimited in Zorro
	3.11).

### Zorro 2.70 list of bugs


- Resuming trades from a stored **.trd** file failed sometimes
	(fixed in Zorro 2.71.3) Workaround: close open trades when ending a
	session.
- Certain combinations of bar period and time frame caused a crash
	in the **priceO** function (Zorro 2.70; fixed in 3.01). Workaroumd:
	Set the **TimeFrame** variable only after the lookback period.
- Brute force
	optimization caused a crash when too many parameters are brute force
	optimized (all Zorro versions; fixed in 3.01).


### Zorro 2.66 list of bugs


- No bugs reported.

### Zorro 2.64 list of bugs


- Sometimes a script started in Train instead of Test mode when it was just trained,
	or vice versa
	(fixed in Zorro 2.66). Workaround: When changing between train and test mode, close Zorro and open it
	again.

### Zorro 2.62 list of bugs


- Tick history with more than 2147483647 ticks could not be loaded under
	some circumstances (all Zorro versions; fixed in
	Zorro 2.64).


- Option trades in the trade liste sometimes had a wrong
	close date (fixed in Zorro 2.64).

- The x axis of **scatter plots** was
	sometimes wrongly scaled (all Zorro versions; fixed in Zorro 2.64).


- The **AUTOCOMPILE** flag was missing in **Z13**,
	which sometimes prevented changing the combo type (fixed in Zorro 2.64).

### Zorro 2.60 list of bugs


- Old **IB TWS API** versions ceased
	to support Forex data. This was reportedly fixed in IB's latest TWS API
	(included in
	Zorro 2.62
	and above).
- The **StartWeek** variable was erroneously
	rounded to a full hour (all Zorro versions; fixed in Zorro 2.62).

### Zorro 2.56 list of bugs


- The **email** function did not always send emails (fixed in
	2.58.0).
- The **sortData** function always sorted in
	ascending order (all Zorro versions; fixed in 2.58.1).
-
	The WFO OOS test overlapped sometimes with the last training period (all
	Zorro versions; fixed in 2.58.1).

### Zorro 2.53 list of bugs


- The 64 bit **Zorro64** version crashed on script selecting when a
	previous script has set
	the **History** pointer and did not set it back to zero after
	the backtest (fixed in 2.56).

- Under some circumstances, **contract(TRADE)** did not work
	with some futures contracts (fixed in 2.56).

### Zorro 2.50 list of bugs


- Under some circumstances, history appended by **loadHistory**
	or **PRELOAD** could overlap with previous data (all Zorro
	versions; fixed in
	2.53).

- The automated **BarZone** setting by **BR_LOCAL**
	caused inconsistencies under some circumstances (removed in Zorro 2.53.7).

### Zorro 2.48 list of bugs


- No known bugs.

### Zorro 2.44 list of bugs


- The **NumUp**/**NumDn** functions were swapped
	(all Zorro versions; fixed in 2.46).
- The **
	strcon** function sometimes produced a wrong option symbol (all Zorro
	versions; fixed in 2.47.4)
- The **assetType** function
	wrongly classified an asset as Forex when its symbol began with a currency
	name (all Zorro versions; fixed in 2.47.9).

### Zorro 2.40 list of bugs


- **Kraken**
	returned wrong PIP values for some assets (fixed in 2.44).
-
	**Trade management functions** did not run when the trade was
	not yet opened (all Zorro versions; fixed in 2.44).
- The **diff**
	function did not return a difference on certain periods (all Zorro versions;
	fixed in 2.44).

### Zorro 2.35 list of bugs


- The **tdm** and **tom** functions assumed
	4-day weeks when **StartWeek**/**EndWeek** covered
	only 4 full days (all Zorro version; fixed in 2.36.7).
- Under some circumstances the log file did not record balance
	and equity changes (Zorro 2.35; fixed in 2.36.7).

### Zorro 2.30 list of bugs


- The **strmid** function returned the last character when
	the length of the given string was exceeded (changed to an empty string in
	2.32.5).

- When **daylight saving mode** changed inside a bar, the end
	time of the bar had still the same daylight saving mode as the start time
	(fixed in 2.34.2)..


### Zorro 2.25 list of bugs


- Trades with entry limit but entered by a TMF were treated in the
	backtest as if the entry limit was hit (Zorro 2.25; fixed in 2.30.4; workaround: set
	**TradeEntryLimit = 0** in the TMF before entering the trade.

- The **tock** function did not run until the
	end of the first bar (Zorro 2.35; fixed in 2.27.3).


### Zorro 2.20 list of bugs


- The **roundto** function rounded inaccurate with certain
	step values (all Zorro versions; fixed in 2.21.6). Workaround: round **x** with **step*floor(x/step+0.5)**.

- If a Zorro process was externally closed with **zClose**, a
	new process with the same **Id** could not be opened (Zorro
	2.10 and above; fixed in
	2.22.7).


### Zorro 2.15 list of bugs


- In the **performance report** the first January return was sometimes printed under
	"December" (all Zorro versios; fixed in 2.16.3).

- The **timeOffset** function could be 1 bar off when the given time and the bar end time were identical (Zorro
	2.15; fixed in
	2.18.6).

- When trading simultaneously with several MT4/MT5 brokers, only
	timestamps of the first broker were converted to UTC (all Zorro versions; fixed in 2.19.2).


### Zorro 2.12 list of bugs


- **FXCM** recently ceased support of previous FxConnect API
	versions. A new API and DLL package (included in 2.14.7) are required for
	further trading with FXCM. Details on the
	[
	user forum](https://opserver.de/ubb7/ubbthreads.php?ubb=showflat&Number=477427&page=1).


### Zorro 2.08 list of bugs


- **Stooq.com** recently ceased delivering price data (changed to
	**stooq.pl**
	in 2.10.2).


### Zorro 2.03 list of bugs


- When a trade was partially closed, its rollover amount displayed in the
	CSV list was from the whole trade, not only from the closed part (all Zorro
	versions; fixed in 2.06.2).


### Zorro 1.96 list of bugs


- The **ndow** function was 1 day off for some dates
	(fixed in 1.98.4).

- **FOP** strike prices were not automatically rounded, which
	could cause small differences such as 81.00001  instead of 81.00000 (fixed
	in 1.99.4).

- In broker arbitrage scripts, the new **brokerAccount** function
	returned only the balance of the first broker when brokers were connected through
	MT4 (fixed in 2.01.2).

- In some rare situations, externally closing a trade on MT4 was not detected
	by Zorro (fixed in 2.02.2).


### Zorro 1.88 list of bugs


- In combination with broker arbitrage or multiple price sources, slashes
	'/' in the symbol prevented downloading prices (fixed in 1.93.7).

- The **http_result** function stored the string terminator byte
	at a wrong position (fixed in 1.95.5).

- **BarPeriod** snapped back to the next slider position when
	a script with nonstandard bar periods was started (fixed in 1.96.1).

- The **TradeDate** variable was wrong defined (fixed in 1.96.4).


### Zorro 1.84 list of bugs


- The **minute** function didn't work in combination with
	**NOW** (fixed in 1.84.2).

- The **IB plugin** returned sometimes no balance (fixed in 1.88.1).

- The **MT4/MT5 bridge** did not resume trades with some particular
	brokers after a Zorro restart (fixed in 1.88.0).


### Zorro 1.74 list of bugs


- Rollover calculation was sometimes missing 1 day (fixed in 1.78.1).

- **wdate** discarded fractional seconds in a tick function (fixed
	in 1.79.2).

- A **last_trades** loop enumerated only the open trades (fixed
	in 1.79.5).

- Filling empty bars with ticks from the previous bar could cause delayed
	ticks (fixed in 1.82.4).

- The **MT5 plugin** sometimes returned a wrong margin requirement
	(fixed in 1.83.1).


### Zorro 1.66 list of bugs


- The **Security** setting in **Zorro.ini** was
	too secure (fixed in 1.71.1).

- Clicking [Result] after plotting a histogram plotted
	the chart in a wrong size (fixed in 1.71.8).

- The image in the live chart was sometimes not updated at every bar (fixed
	in 1.72.5).

- The variables **rMomentum**, **vDominantPeriod**,
	and **vDominantPhase** were not updated (fixed in 1.72.6).

- M1 data downloaded with the IB bridge were off by 1 minute (fixed in 1.73.6).

- Profit of **option positions** that were opened and immediately
	closed was recorded without ask/bid spread (fixed in 1.74.1).

- The **max down time** was too long on some charts (fixed in
	1.74.3).

- A wrong **Z3 system** was included in an early 1.74 release
	(fixed in 1.74 release of Feb 2, 2018).


### Zorro 1.60 list of bugs


- The asset list from **Accounts.csv** was not always loaded
	at the begin of a strategy (fixed in 1.61.3; workaround: use the
	[assetList()](asset.htm) command or define the asset list in Z.ini).


- The **Z8 strategy** loaded asset prices twice and thus was
	more likely to hit the Stooq daily download limit (fixed in the current 1.60.1
	version).

- Partially closing and closing less than 1 contract via **MT4 bridge**
	did not work with some brokers (fixed in the current 1.60.1 version).

- **Entry** was ignored in the backtest when **EntryDelay**
	was set at the same time (fixed in 1.61.4).

- Exit **Slippage** was ignored in the backtest when trades hit
	a **Stop** or **TakeProfit** limit (fixed in 1.62.1).


- **TrailStep** was ignored when many trades were opened in parallel
	(fixed in 1.62.4).

- The **Median** function was off by one index step for data
	arrays with even length (fixed in 1.62.8).  


### Zorro 1.56 list of bugs


- Plot lines of multiple assets were sometimes assigned to the wrong asset
	(fixed in 1.59.2).

- Balance curves in training mode were exported in a wrong format, which prevented
	reproducing the
	[
	2015 Trend Experiments](http://www.financial-hacker.com/boosting-systems-by-trade-filtering) (fixed in 1.59.3).

- Trading options and underlying at the same time could automatically close
	positions when [hedging](hedge.htm) was disabled and/or trades were
	partially closed (fixed in 1.59.6).

- If a trade could not be closed for 2 working days, it was automatically
	removed from the trade list, which could cause an orphaned trade in some situations
	(fixed in 1.59.9).

- The **Time in Market** parameter was wrong in WFO Tests (fixed
	in 1.59.9). 


### Zorro 1.54 list of bugs


- Some bar offset / bar zone combinations with daily bars caused the Friday
	bar to be skipped (fixed in 1.55.1).

- The [Risk](lots.htm) variable for limiting the trade risk did
	not consider commission (fixed in 1.55.9).

- Backtests starting in January sometimes had several additional days in the
	lookback period (fixed in 1.56.5).


### Zorro 1.50 list of bugs


- Symbols not beginning with a letter were ignored (fixed in V 1.51.1).


- The **ZigZag** indicator sometimes plotted wrong lines (fixed
	in V 1.51.7).

- The total rollover cost was not calculated in live trading mode when the
	broker API did not provide accumulated rollover for trades (fixed in V 1.51.8).


- Since about October 15, from time to time trades are rejected by Oanda due
	to a too high precision of the stop loss (fixed in V 1.51.9).

- **Slippage** simulation was not 100% neutral in some cases,
	but affected by the price slope inside the current bar (fixed in V 1.52.0).


- MT4 bridge V1.11 did not properly filter away price outliers by some MT4
	servers, which could cause price and profit spikes on the chart (fixed in V1.52.2).

- Setting a new stop loss of an open trade with **exitLong/exitShort**
	required that the trade already had a stop loss; it did not work for trades
	with no stop (fixed in V1.52.4). Workaround: enter the trade with a distant
	stop when you want to modify the stop loss afterwards with **exitLong/exitShort**.


- Under some circumstances, a trade with prices belonging to a different asset
	was painted in the chart (fixed in 1.52.7).

- Partially closing trades could close the whole trade under some circumstances
	(fixed in 1.52.7).

- The **day** functions returned a wrong value on time zones
	containing a UTC midnight transition (fixed in 1.54.4).


### Zorro 1.46 list of bugs


- It was a bit difficult to set up the **Capital** slider in
	**Z8** (improved in Z8.2).

- If a file **"History\XXX_2016.bar"** was present
	for one of the Z8 assets, Z8 attempted to download historical data from IB,
	which consequently failed (fixed in Z8.2). Workaround: if you somehow generated
	a "**XXX_2016.bar"** file for a Z8 asset, delete it.


- Sometimes **Z8** prints an error message **"Can't
	open Z8.par"** at startup (fixed in Z8.2). The message can be safely
	ignored.

- The Oanda plugin sometimes displayed erroneous error messages **"XXX
	not available"** (fixed in V 1.47.2). The messages can be safely
	ignored.

- Oanda could not close many trades at the same time under some circumstances
	(fixed in V 1.47.6).

- The annual return was wrong calculated when the trade volume was less than
	1$ (fixed in V 1.47.7).

- Depending on the scale of the chart, some **DOT** elements
	were not visible (fixed in V 1.49.0).

- **PlotBars** was not compatible with **plotGraph**
	(fixed in V 1.49.0).

- When multiple time frames and time zones are used, the local time difference
	to previous bars was sometimes off by 24 hours (fixed in V 1.50.4).

- When **WFOPeriod** was set, the asset price was 0 in the last
	bar of the lookup period in live trading under some circumstances (fixed in
	V 1.50.6).


### Zorro 1.40 list of bugs


- Clicking [New Script] produced an erroneous error
	message in the editor (fixed in 1.40.2). Workaround: Ignore the error message
	and click [New] in the editor.

- When terminating a session and answering "Yes" on "Close
	all open trades?", the trades are closed, but are wrongly indicated as
	still open with an error message in the message window (fixed in 1.40.2). Workaround:
	Ignore the error message and delete the **.trd** file when closing
	all trades.

- **RiskVal** was wrong when trades are partially closed (fixed
	in 1.42.1).

- **MT4 bridge version 1.8 **caused price outliers with some
	brokers and asset combinations (fixed in bridge 1.9).

- Running **R functions** did not work under some circumstances
	(fixed in V 1.44.1).

- The **[FAST](mode.htm)** flag did not work in combination
	with a **TMF** (fixed in V 1.45.0).

- Trading a portfolio (f.i. a Z system) with the Oanda plugin caused a
	**"Rate limit violation"** error message on some computers
	(fixed in V 1.45.1).

- Assets that are traded only 8 hours per day (such as GER30) sometimes got
	an insufficient price history in the backtest, causing the lookback period to
	end after **StartDate** (fixed in V 1.45.1).

- The **Assets.csv** file was generated with Linux line-end characters,
	which could cause problems in some cases when subsequently using it for a new
	asset list (fixed in V 1.45.1).

- The **ldow** function returned a wrong value when **offset**
	was 0 (fixed in V 1.45.3).

- On 24-hour bars the bar period did under some circumstances not remain constant
	when the price server time deviated from the PC time (fixed in V 1.45.3).

- **NEW|DOT** in a plot command didn't open a new chart (fixed
	in V 1.46.1).

- The exported balance curve was clipped at the equity peaks (fixed in V 1.46.1).  


### Zorro 1.34 list of bugs


- The last parameter value was not displayed in the parameter histograms (fixed
	in 1.35.1).

- Testing multiple assets could cause a crash at the end of the simulation
	when price data was missing (fixed in 1.35.1).

- Opening or closing a trade in a TMF that was triggered by the entry/exit
	event of another trade used the current tick price instead of the entry/exit
	price of the triggering trade. This caused a inaccuracy that could sum up to
	a large amount at the end of the simulation (fixed in 1.35.1).

- The Win Payout for binary options was wrong (fixed in 1.36.5).


### Zorro 1.28 list of bugs


- Average and maximum trade duration in the performance report was wrong calculated
	and slightly too high (fixed in 1.31.4).

- Virtual hedging gave inaccurate simulation results when trades are entered
	inside bars (fixed in 1.31.4).

- The **SHUFFLE** flag did not work for THLOC ticks (fixed in
	1.33.1).

- Graphic symbols on a histogram, as with [plotMAEGraph](profile.htm),
	appeared on wrong positions or not at all when the lookback period was too long
	(fixed in 1.33.5).


### Zorro 1.26 list of bugs


- The **tom** function returned a wrong number of days (fixed
	in Zorro 1.28.3).

- The **AGC** alpha value was wrong calculated from the time
	period (fixed in Zorro 1.28.3).

- NET trade statistics and WFO cycle results were sometimes wrongly displayed
	in the performance report (fixed in Zorro 1.28).

- Under certain circumstances, closing a trade virtual hedging mode closed
	the corresponding pool trade instead (fixed in Zorro 1.28).

- Pending trades were sometimes not entered when a stop or takeprofit distance
	was set (fixed in Zorro 1.28). Workaround: use absolute price limits for stop
	or profit targets with pending trades.

- **Hedge = 5** did not work under some circumstances when multiple
	assets were used (fixed in Zorro 1.27). Workaround: use Hedge = 4 for virtual
	hedging with multi-asset systems.

- The **-a** command line option did not work under some circumstances
	for changing the asset (fixed in Zorro 1.27). Workaround: set the asset in the
	script with the **asset()** function.

- The displayed slippage in the live trading statistics was wrong when phantom
	trades were used (fixed in Zorro 1.27).

- The **http_transfer** function did not always return NULL when
	the transfer failed.


### Zorro 1.24 list of bugs


- The broker API returned zeros for all asset parameters in the first bar
	(fixed in Zorro 1.26). This also affects the Download script.

- The [ZMA](ta.htm) indicator always used a time period of 1 (Zorro
	1.18 and above; fixed in Zorro 1.26).

- The **ATRS** indicator only returned the range of one period
	(fixed in Zorro 1.26).

- The default value of $1 for **Margin** was too high for trading
	single lots of assets with a lot value below 1$. This did not affect trading,
	as single lots can not be opened with such assets anyway.

- Anchored WFO opened no trades in the training cycle under some circumstances.


- If a trade algorithm skipped all short trades, or if all trades are won
	and no one was lost, the **OptimalF** factors were wrong in the
	performance report and in training.

- Virtual hedging could cause an endless loop or wrong trade handling in the
	backtest under some circumstances. This bug did not affect trading.

- **PlotDate** did not set the date for **plotGraph()**
	calls.

- **Hedge = 5** displayed wrong portfolio statistics when no
	**algo** identifiers were used.

- The [frechet](detect.htm) function was not independent of the
	pattern size.

- The [FisherInv](filters.htm) function had a superfluous 'Period'
	parameter.

- The [plotMAEGraph](profile.htm) function produced an empty graph.

- After testing an executable script in **.x** format with Zorro
	S, the script had to be selected again with the Strategy scrollbox.


### Zorro 1.16 list of bugs


- **Virtual hedging** and **equity curve trading**
	didn't work at the same time under some circumstances (fixed in Zorro 1.20)

- The **Simulate.c** script contained a wrong variable name.
	Fix: Edit the script and replace "**Hedging**" with "**Hedge**".

- The **.csv** files with the trade records got a wrong file
	names in [Test] mode when **oversampling**
	was used (Zorro 1.12 and above; fixed in Zorro 1.17). Simply ignore the superflous
	files.

- **Virtual Hedging** started in [Test]
	mode with a wrong net trade size when **oversampling** was used
	(fixed in Zorro 1.17).


### Zorro 1.12 list of bugs


- Phantom trading performance was not listed in the trade statistics parameters.


- **Weekend** = 1 was not properly supported in Trade mode.


- When more than 10 signals are used for the [decision
	tree](advisor.htm), the generated .c file contained wrong names in the decision functions.

- When a [perceptron signal](advisor.htm) did not contain useful
	information, the signal was missing in the generated .c file, causing a syntax
	error.

- When trading with FXCM, the displayed equity and some trade profits are
	wrong due to bugs of the FXCM ForexConnect API. This does not affect trading,
	but affects the display window. Zorro version 1.16 can now correct the wrong
	values with the [SET_PATCH](brokercommand.htm) command.

- The MT4 bridge 'hung' when the script attempted to download prices of a
	nonexisting asset (all Zorro versions; fixed in version 1.14).

- On nanolot accounts (1 lot = 100 contracts) the rollover fee was 10 times
	too high in the simulation (all Zorro versions; fixed in version 1.14).

- Downloading a previously unsubscribed asset causes an Error 054 message
	(versions 1.10 and 1.12; fixed in version 1.13).

- The included workshop 8 scripts were for version 1.10 and don't work anymore
	with 1.12 due to an internal change (fixed in version 1.13).

- The FXCM API could crash after one or more weeks depending on the PC configuration.
	This caused a **"No Data"** message in the Zorro window
	and possibly a subsequent crash of the script. Zorro 1.14 contains a new FXCM
	plugin where this bug is supposedly fixed.


# []()It's
unprovable that a sufficiently complex program is bug-free. The proof:


You can never be sure that a program is bug-free and won't crash -
for instance, freeze by an endless loop - with all possible parameters that it processes.
In the case of Zorro, 'all possible parameters' means all possible scripts and data.
Alan Turing found the proof 80 years ago. Consider a function **BugFree**
that can test whether a program with certain entry parameters crashes or not.
**BugFree** looks like this (in pseudo code):

```
function BugFree(Program,Parameters)
{
   if(Program does not crash with given Parameters)
     return 1;
   else
     return 0;
}
```


Of course **BugFree** must not crash itself, but terminate properly
even when the tested **Program** crashes. Now we define a recursive
function **TestMe** that calls **BugFree**:

```
function TestMe(Program)
{
   if(BugFree(Program,Program))
     TestMe(Program);
}
```


This evil function only terminates when **Program** does not crash
when it gets itself as a parameter (this means here a Zorro running its own source
code). Otherwise **TestMe** calls itself endlessly and freezes. If
you now call **TestMe** with itself as a parameter, you'll get a contradiction:


```
TestMe(TestMe);
```


This call does not crash only when it crashes. Therefore a function like
**BugFree** cannot exist. Therefore we can never know if Zorro won't
crash with your script and data before actually running it.

#


 
[►
latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
