# AssetMode

Source: https://zorro-project.com/manual/en/assetmode.htm

AssetMode


## AssetMode

Asset specific flags that affect the currently selected asset. The following flags can be set
or reset with the **setf** and **resf** macros:

### Flags:


     | **NOPRICE**
     | Prevents price updates in live trading while set. Can reduce
	bandwidth when an asset is temporarily not used or its price is not
	relevant.


     | **SOFTSWAP**
     | Causes [rollover](spread.htm) to be
	continuously accumulated, rather than once per day.


### Remarks:


- An asset must be selected before setting or resetting its flags.


### Example:


```
setf(AssetMode,NOPRICE);  *// disable asset updates*
```


### See also:

[asset](asset.htm),
[setf](setf.htm), [resf](setf.htm)

[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
