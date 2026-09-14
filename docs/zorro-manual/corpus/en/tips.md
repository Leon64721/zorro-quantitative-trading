# Tips & Tricks

Source: https://zorro-project.com/manual/en/tips.htm

Tips & Tricks


# Tips & Tricks


In the following you'll find short code snippets for common tasks.

# I. Trade Management


### Change  stops and profit targets of all open long trades with the current algo and asset


```
exitLong(0,NewStop);
exitLong(0,-NewTakeProfit);
```


### If a trade is opened, close all other pending trades


```
if(NumOpenTotal > 0)
  for(open_trades)
    if(TradeIsPending)
      exitTrade(ThisTrade);

```


### Lock 80% profit of  all winning trades


```
for(open_trades)
  if(TradeIsOpen && !TradeIsPool && TradeProfit > 0) {
    TradeTrailLock = 0.80; *// 80% profit (minus trade costs)*
    if(TradeIsShort)
      TradeTrailLimit = max(TradeTrailLimit,TradePriceClose);
    else
      TradeTrailLimit = min(TradeTrailLimit,TradePriceClose);
  }
```


### Iceberg trade: split a large trade into 10 small trades, one every 30 seconds


```
for(OrderDelay = 0; OrderDelay < 10*30; OrderDelay += 30)
  enterLong(Lots/10);
```


### Calculate the value of all open trades with the current asset


```
var valOpen()
{
  var val = 0;
  for(open_trades)
        if(strstr(Asset,PrevAsset) && TradeIsOpen)
      val += TradeProfit;
  return val;
}
```


### Monitoring and modifying a certain trade


```

...
TRADE* MyTrade = enterlong();
...
ThisTrade = MyTrade; *// connect trade variables to MyTrade*
var MyResult = TradeProfit;* // evaluate trade variables*
...
exitTrade(MyTrade,0,TradeLots/2); *// exit half the trade*

```


### Basket trading (creating an artificial asset from a 'basket' of real assets) []()


```
*// generate a snythetic asset "USD" combined from the USD value of EUR, GBP, and AUD*
var priceUSD()
{
  var p = 0;
  asset("GBP/USD"); p += price();
  asset("AUD/USD"); p += price();
  asset("EUR/USD"); p += price();
  return p;
}

*// basket trade function with stop limit*
int tradeUSD(var StopUSD)
{
  if((TradeIsLong && priceUSD() <= StopUSD)
    or (TradeIsShort && priceUSD() >= StopUSD))
      return 1; *  // exit the trade*
  else return 0;  *// continue the trade*
}

*// open a trade with the synthetic asset and a stop loss*
void enterLongUSD(var StopDistUSD)
{
  var StopUSD = priceUSD()-StopDistUSD;
  asset("GBP/USD"); enterLong(tradeUSD,StopUSD);
  asset("AUD/USD"); enterLong(tradeUSD,StopUSD);
  asset("EUR/USD"); enterLong(tradeUSD,StopUSD);
}

void enterShortUSD(var StopDistUSD)
{
  var StopUSD = priceUSD()+StopDistUSD;
  asset("GBP/USD"); enterShort(tradeUSD,StopUSD);
  asset("AUD/USD"); enterShort(tradeUSD,StopUSD);
  asset("EUR/USD"); enterShort(tradeUSD,StopUSD);
}

*// plot a price curve of the synthetic asset
// (the plot command is linked to the last used asset -
// so "EUR/USD" must be selected in the scrollbox)
*function run()
{
  set(PLOTNOW);
  plot("USD",priceUSD(),0,RED);
}
```


# II. Indicators & Signals


### Generate an indicator with a different asset, time frame, and shift


```
*//extended ATR function with individual asset and timeframe (in minutes*)
var extATR(string symbol,int period,int length,int shift)
{
  ASSET* previous = g->asset; *// store previous asset*
  if(symbol) asset(symbol);   *// set new asset*
  if(period) TimeFrame = period/BarPeriod;
*// create price series with the new asset / timeframe*
  vars H = series(priceHigh()),
    L = series(priceLow()),
    O = series(priceOpen()),
    C = series(priceClose());
  TimeFrame = 1; *// set timeframe back*
  g->asset = previous; *// set asset back*
  return ATR(O+shift,H+shift,L+shift,C+shift,length);
}
```


### Calculate the weekend price change for gap trading


```
*// use 1-hour bars, wait until Sunday Sunday 5pm ET,
// then get the price change from Friday 5pm ET*
if(dow() == SUNDAY && lhour(ET) == 5) {
  int FridayBar = timeOffset(ET,SUNDAY-FRIDAY,5,0);
  var PriceChange = priceClose(0) - priceClose(FridayBar);
  ...
}
```


### Use a series to check if something happened within the last n bars


```
*// buy if Signal1 crossed over Signal2 within the last 7 bars*
...
vars crosses = series(0); *// generate a series and set it to 0*
if(crossOver(Signal1,Signal2)
  crosses[0] = 1;* **// store the crossover in the series*
if(Sum(crosses,7) > 0) *// any crossover within last 7 bars?*
  enterLong();
...
```


### Use a loop to check if something happened within the last n bars


```
*// buy if Signal1 crossed over Signal2 within the last 7 bars*
...
int i;
for(i=0; i<7; i++)
  if(crossOver(Signal1+i,Signal2+i)) { *// crossover, i bars ago?*
    enterLong();
    break; *// abort the loop*
  }
...
```


### Align a time frame to a certain event[]()


```
*// Return a timeframe aligned to Event == true
// f.i. TimeFrame = frameAlign(hour() == 0); aligns to midnight*
int frameAlign(BOOL Event)
{
  vars Nums = series(0,-1); *// 1-element static series for storing the bar counter*
  if(!Event) {
    Nums[0]++;      *  // count skipped bars
*    return 0;         *// continue the frame*
  } else {
    int Skipped = -Nums[0]; *// start a new time frame*
    Nums[0] = 0;      *// reset the counter*
    return Skipped;
  }
}
```


### Shift a series into the future


```
*// the future is unknown, therefore fill
// all unknown elements with the current value*
vars seriesShift(vars Data,int shift)
{
  if(shift >= 0) *// shift series into the past*
    return Data+shift;
  else { *// shift series into the future*
    int i;
    for(i = 1; i <= shift; i++)
      Data[i] = Data[0];
    return Data;
  }
}
```


### Use a function or indicator from an external DLL


```
*// Use the function "foo" from the DLL "bar.dll"
// Copy bar.dll into the Zorro folder*
int foo(double v1,double v2); *// foo prototype*
API(foo,bar) *// use foo from bar.dll*

function run()
{
  ...
  int result = foo(1,2);
  ...
}
```


# III. Auxiliary


### Find out if you have a standard, mini, or micro lot account


```
*// Click [Trade] with the script below
*function run()
{
  asset("EUR/USD");
  if(Bar > 0) {
    if(LotAmount > 99999)
      printf("\nI have a standard lot account!");
    else if(LotAmount > 9999)
      printf("\nI have a mini lot account!");
    else
      printf("\nI have a micro lot account!");
    quit();
  }
}
```


### Download historic price data


```
*// Click [Trade] for downloading/updating the latest "NZD/USD" price data
*function main()
{
  NumYears = 6;     *// download up to 6 years data* *
*  assetHistory("NZD/USD",1);* // update the price history*
}
```


### Export historical price data to a .csv file


```
*// Click [Test] for exporting price data to a .csv file in the Data folder
// The records are stored in the format: time, open, high, low, close
// f.i. "31/12/12 00:00, 1.32205, 1.32341, 1.32157, 1.32278"
// Dependent on the locale, date and numbers might require a different format*
function run()
{
  BarPeriod = 1440;
  StartDate = 2010;
  EndDate = 2020;
  LookBack = 0;

  string Row = strf(
    "%02i/%02i/%02i %02i:%02i,%.5f,%.5f,%.5f,%.5f\n",
    day(),month(),year()%100,hour(),minute(),
    priceO(),priceH(),priceL(),priceC());
  if(is(INITRUN))
    file_delete("Data\\export.csv");
  else
    file_append("Data\\export.csv",Row);
}

```


### Export historical price data from MT4 to a .csv file


```
*// MQL4 EA script. Run it in the Tester.
// The CSV file is stored in Terminals\Commom\Files.
*int Handle;
int CurrentTime;

*// detect new bar for emulating run()
*int isNewBar()
{
  if(CurrentTime != Time[0]){
    CurrentTime= Time[0];
    return(1);
  }
  return(0);
}

void OnInit()
{
  string Name = StringConcatenate("MT4_",Symbol(),".csv");
  Handle = FileOpen( Name,FILE_CSV|FILE_WRITE|FILE_COMMON, ',');
  if(Handle == INVALID_HANDLE)
    Print("Can't open ",Name,"!");
  CurrentTime = Time[0];
}

void OnTick()
{
  if(isNewBar() && Handle != INVALID_HANDLE) {
    FileWrite(Handle,
      TimeToStr(Time[1],TIME_DATE),
      iOpen(Symbol(),Period(),1),
      iHigh(Symbol(),Period(),1),
      iLow(Symbol(),Period(),1),
      iClose(Symbol(),Period(),1));
  }
}

void OnDeinit()
{
  FileClose(Handle);
}

```


### Print the description of a trade (like "**[AUD/USD:CY:S1234]") **in the log


```
void printTradeID()
{
  string ls = "L", bo = "[", bc = "]";
  if(TradeIsShort) ls = "S";
  if(TradeIsPhantom) { bo = "{"; bc = "}"; }
  printf("#\n%s%s:%s:%s%04i%s ",
    bo,TradeAsset,TradeAlgo,ls,TradeID%10000,bc);
}
```


### Plot equity curves of single assets in a multi-asset strategy


```
char name[40]; *// string of maximal 39 characters*
strcpy(name,Asset);
strcat(name,":");
strcat(name,Algo);
var equity = EquityShort+EquityLong;
if(equity != 0) plot(name,equity,NEW|AVG,BLUE);
```


### Set up strategy parameters from a .ini file at the start


```
function run()
{
  static var Parameter1 = 0, Parameter2 = 0;
  if(is(INITRUN)) { *// read the parameters only in the first run*
    string setup = file_content("Strategy\\mysetup.ini");
    Parameter1 = strvar(setup,"Parameter1");
    Parameter2 = strvar(setup,"Parameter2");
  }
}

*// mysetup.ini is a plain text file that contains
// the parameter values in a format like this:
Parameter1 = 123
Parameter2 = 456*
```


### Check every minute in [Trade] mode if an .ini file was modified


```
var Parameter1 = 0, Parameter2 = 0;

function tock() *// run once per minute*
{
  static int LastDate = 0;
  if(LastDate && !Trade) return; *// already updated*
  int NewDate = file_date("Strategy\\mysetup.ini");
  if(LastDate < NewDate) {
    LastDate = NewDate; *// file was modified: update new parameters*
    string setup = file_content("Strategy\\mysetup.ini");
    Parameter1 = strvar(setup,"Parameter1");
    Parameter2 = strvar(setup,"Parameter2");
  }
}
```


# IV. Get Rich Quick[]()


### 90% win rate


```
function run()
{
  Stop = 10*ATR(100);
  TakeProfit = Stop/10;
*// open new trade at random after last trade hit its target*
  if(NumOpenTotal == 0) {
    if(random() < 0)
      enterShort();
    else
      enterLong();
  }
}
```


### Martingale


```
function run()
{
  BarPeriod = 1440;
*// set up equal stop and profit limits*
  Stop = TakeProfit = ATR(100);
*// double the stake after every loss*
  Lots = pow(2,LossStreakTotal); *// winning guaranteed...*
*// open new trade at random after last trade hit its target*
  if(NumOpenTotal == 0) {
    if(random() < 0)
      enterShort();
    else
      enterLong();
  }
}
```


### Grid Trading


```
*// helper function for finding trades at a grid line
*bool findTrade(var Price,var Grid,bool IsShort)
{
  for(open_trades)
    if((TradeIsShort == IsShort)
      and between(TradeEntryLimit,Price-Grid/2,Price+Grid/2))
        return true;
  return false;
}

function run()
{
  BarPeriod = 1440;
  Hedge = 2;
  EntryTime = ExitTime = 500;
  var Price;
  var Grid = 100*PIP; *// grid spacing*
  var Current = priceClose();
*// place pending trades at 5 grid lines
// above and below the current price*
  for(Price = 0; Price < Current+5*Grid; Price += Grid) {
    if(Price < Current-5*Grid)
      continue;
    if(Price < Current and !findTrade(Price,Grid,true))
      enterShort(0,Price,0,Grid);
    else if(Price > Current and !findTrade(Price,Grid,false))
      enterLong(0,Price,0,Grid);
  }
}
```


### See also:

[ Strategy](strategy.htm), [Indicators](ta.htm)


[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
