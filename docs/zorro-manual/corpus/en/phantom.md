# phantom

Source: https://zorro-project.com/manual/en/phantom.htm

phantom


## phantom (int Dir, int FastPeriod, int SlowPeriod) : int

Function for 'equity curve trading'. Detects from the equity curve if the market
is in an unprofitable state and trading with the current asset/algo combination is not advised.
Phantom trading is automatically activated for the current algo/asset component
when its short-term filtered equity curve is below its long-term equity curve,
and both are falling.

### Parameters:


             | **Dir**
             | **1** for long trades, **-1** for
			short trades, **0** for both.


             | **FastPeriod**
             | Lowpass period for filtering the equity curve.


             | **SlowPeriod**
             | Lowpass period for further filtering the fast-term filtered equity curve.


### Returns

 **3** when phantom trading is active for the current component,
**2** when it was just activated, **1** when it was
just deativated, otherwise **0**.

### Remarks:


- This function creates [series](series.htm) and thus
		  must be called in a fixed order in the script.

- Pending trades are not affected. They can be switched to
				phantom mode in a loop that sets their TR_PHANTOM flag.

- The source code can be found in **indicators.c**.


### Example:


```
switch(phantom(0,5,10)) { *// short and long phantom trading
*  case 2: printf("#\n%s %s phantom trading activated",Asset,Algo);
  case 1: printf("#\n%s %s phantom trading deactivated",Asset,Algo);
}
```


### See also:

            [predict](predict.htm), [Phantom Trading](trademode.htm),
[TR_PHANTOM](trademode.htm)


			[► latest
version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
