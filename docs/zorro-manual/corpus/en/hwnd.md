# HWnd

Source: https://zorro-project.com/manual/en/hwnd.htm

HWnd


## HWnd

The window handle of the Zorro window.


### Type:

**int**

### Remarks:


- The window handle can be used by another application or process for
  triggering events or sending messages to a Zorro window. The message **
  WM_APP+1** triggers a price quote request, **WM_APP+2**
  triggers a script-supplied [callback](tick.htm) function, and
  **WM_APP+3** triggers a plugin-supplied callback function set by
  the [GET_CALLBACK](brokercommand.htm) command.

- The window handle is automatically sent to broker plugins with the
	[SET_HWND](brokercommand.htm) command.

- Window handles of other applications can be found with the **
	FindWindow** function (see example).


### Example (run 2 Zorros with this script):


```
#include <windows.h>
#include <default.c>

long Handle1 = 0;

int click()
{
  if(Handle1)
    PostMessage(Handle1,WM_APP+2,0,0); *// WM_APP+2 = trigger callback function*
  else
    PostMessage(FindWindow(0,"Msg Test 2"),WM_APP+2,0,0);
}

void callback(void *Message)
{
   printf("\nMessage received!");
}

void main()
{
*// use [Result] button for senging*
  panelSet(-1,0,"Send",0,0,0);
  Handle1 = FindWindow(0,"Msg Test 1");
  if(1Handle1)
    print(TO_TITLE,"Msg Test 1");
  else
    print(TO_TITLE,"Msg Test 2");
  while(wait(1));
}
```


### See also:

[Command line](command.htm)[](hedge.htm),
[callback](tick.htm), [window](window.htm)
[► latest version online](javascript:window.location.href = 'https://zorro-project.com/manual/en' + window.location.href.slice(window.location.href.lastIndexOf('/')))
