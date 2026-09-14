# tradeUpdate

Source: https://zorro-project.com/manual/en/tradeupdate.htm

tradeUpdate


## tradeUpdate(TRADE*, int NewLots, var NewStop, var NewTP, int NewLifeTime)

Resizes or updates parameters of a particular open or pending trade.

## tradeUpdatePool()

Updates pool trades to the current open virtual trades in [
virtual hedging](hedge.htm) mode. Automatically performed
after any trade with **Hedge** = **4**, or once per bar
with **Hedge** = **5**. Must be called by script
with **Hedge = 6**.

### Parameters:


     | **TRADE***
     | Pointer to the trade to be updated, or **0** to update pool
	trades to the current open virtual trades.


     | **NewLots**
     | New number of lots, or **0** for not resizing. For reducing
	the trade size, partial closing must be supported by the broker; for
	increasing the trade size, [virtual hedging](hedge.htm) must be enabled.


     | **NewStop**
     | New stop loss limit, or **0** for no change.


     | **NewTP**
     | New profit target, or **0** for no change.


     | **NewLifeTime **
     | New life time in number of bars, or **0** for no change.


### Returns:

**0** when the operation failed, otherwise nonzero.

### Remarks:


- Only the positions (**NewLots**) of real or virtual trades can be increased. Pool trades take
  over the new lot size either at the next bar or when calling **tradeUpdate()**.

-  Trades are automatically updated with the new parameters when the
	maximum number of trades by [MaxLong/MaxShort](lots.htm) is
	exceeded.

- If the [TRAILSTOP](mode.htm) or [
	TRAILPROFIT](mode.htm) flags are set, stops and profit targets are only changed
	when they are closer to the current price level.


### Example:


```
function double_all_trades()
{
  if(Hedge < 4) return;
  for(open_trades)
    if(TradeIsVirtual))
      tradeUpdate(ThisTrade,2*TradeLots,0,0,0);
  tradeUpdatePool(); *// adapt pool trades*
}
```


### See also:

[exitTrade](selllong.htm),
[enterTrade](buylong.htm), [Lots](lots.htm), **
[Stop](stop.htm)**, [LifeTime](timewait.htm),
[TMF](trade.htm), [Fill](fill.htm), [Hedge](hedge.htm)


 [► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
