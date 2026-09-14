# log

Source: https://zorro-project.com/manual/en/avar-log.htm

log


## log(var x): var

		Logarithm of **x** with base **e**.

### Parameters:

		**x**
  - any **var**.

### Returns:

  **ln(x)**

### Remarks:


- For the logarithm with base **n**, divide by **log(n)**.
	For instance, **log****10****(x)
	= log(x)/log(10)**.


### Examples:


```
x = log(1); *// x == 0*
x = log(2.718); *// x == 1 (2.718 is an approximation to the constant e)*.
x = log(y)/log(2); *// x == log2(y), i.e. log(y) base 2.*
```


### See also:

[exp](avar-exp.htm), [pow](avar-pow.htm),
[sqrt](avar-sqrt.htm)
[► latest
version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
