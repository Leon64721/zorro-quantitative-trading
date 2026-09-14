# lock

Source: https://zorro-project.com/manual/en/lock.htm

lock


## lock(): int

Synchronizes the behavior of several Zorro instances, f.i. for preventing that they write into the same file at the same time ([Zorro S](restrictions.htm) only). If another Zorro has called **lock()** before,  this function waits until it either calls **unlock()** or the [Stop] key was pressed. In the latter case **lock()** returns 0, otherwise nonzero.

## unlock()

Cancels a previous **lock** call and let other waiting Zorros continue.

### Example (see also [putvar/getvar](putvar.htm)):


```
lock(); *// prevent that other Zorros write into same file*
file_append(Name,Text1);
file_append(Name,Text2);
unlock();

```


### See also:


  [timer](timer.htm), [run](run.htm), [wait](sleep.htm),
[suspended](suspended.htm), [quit](quit.htm), [version](version.htm)


     [► latest
  version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
