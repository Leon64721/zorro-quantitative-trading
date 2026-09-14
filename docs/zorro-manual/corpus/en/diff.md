# diff

Source: https://zorro-project.com/manual/en/diff.htm

diff


## diff (var x, int Period): var

Returns the difference of **x** to its value from **Period** bars before.

### Parameters:


             | **x**
             | Variable for difference calculation.


### Returns

        **x - previous x**


### Remarks


- This function generates a [series](series.htm) and must be
   called in a fixed order in the script.

- **diff(log(x),1)** returns the log return of **x** , since **log(a/b) = log(a) - log(b)**.


### Example:


```
*// generate a price difference serie*
vars Changes = series(diff(priceC(),1));

```


### See also:

            [series](series.htm), [ROCP](ta.htm#roc)


			[► latest
version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
