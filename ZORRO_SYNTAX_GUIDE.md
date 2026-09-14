# 📚 ZORRO SYNTAX GUIDE - Corrected

**Date**: 2026-09-15  
**Status**: Investigation Complete  
**Issue Found**: Incorrect indicator function names and syntax

---

## ❌ ERRORES EN MI CONVERSIÓN

### Error 1: Función `MA()` no existe
```
❌ WRONG: var kc_upper = MA(close(), 20)[1];
✅ CORRECT: var sma = SMA(series(priceClose()), 20);
```

### Error 2: `close()` no existe como función
```
❌ WRONG: close()[1]
✅ CORRECT: priceClose() o usar series(priceClose())
```

### Error 3: `StdDev()` es diferente en ZORRO
```
❌ WRONG: StdDev(close(), 50)[2]
✅ CORRECT: BBands() para Bollinger, o calcular manualmente
```

---

## ✅ ZORRO CORRECT SYNTAX

### Función Principal
```c
function run()
{
    // Configuración
    BarPeriod = 5;      // 5 minutes
    StartDate = 20200101;
    EndDate = 20261231;
    
    // Asset
    asset("ES");
    
    // Lógica de trading
    // ...
}
```

### Indicadores Disponibles en ZORRO
```c
// Crear series de datos
vars Closes = series(priceClose());
vars Opens = series(priceOpen());

// Indicadores básicos
var sma = SMA(Closes, 20);        // Simple Moving Average
var ema = EMA(Closes, 20);        // Exponential Moving Average
var atr = ATR(20);                // Average True Range
var rsi = RSI(Closes, 14);        // Relative Strength Index

// Bollinger Bands
BBands(Closes, 20, 2, 2, MAType_SMA);
// After calling BBands:
// rRealUpperBand = upper band
// rRealLowerBand = lower band
// rRealMiddleBand = middle band

// ROC (Rate of Change)
var roc = ROC(Closes, 5);

// MACD
MACD(Closes, 12, 26, 9);
// rValue = MACD line
// rSignal = Signal line
```

### Precios y Datos
```c
price()          // Current price (close)
priceOpen()      // Open price
priceHigh()      // High price
priceLow()       // Low price
priceClose()     // Close price (same as price())
volume()         // Volume

// Para obtener barras anteriores, usar series():
vars Closes = series(priceClose());
var current = Closes[0];
var previous = Closes[1];
var twoBarAgo = Closes[2];
```

### Entrada y Salida
```c
// Entrada
enterLong();           // Enter long position
enterShort();          // Enter short position

// Salida
exitLong();            // Exit long position
exitShort();           // Exit short position

// Posiciones
NumOpenLong          // Number of open long positions
NumOpenShort         // Number of open short positions
```

### Stop Loss y Take Profit
```c
// Método 1: Valores fijos
Stop = 100 * PIP;     // Stop loss in pips
Trail = 50 * PIP;     // Trailing stop in pips

// Método 2: Dinámico (en el código)
setStop(price - 100 * PIP);
setProfit(price + 200 * PIP);
```

### Tiempo
```c
hour()      // Current hour (0-23)
minute()    // Current minute (0-59)
day()       // Current day of month
dow()       // Day of week (1=Monday, 7=Sunday)
year()      // Current year
NOW         // Current time constant
TradeBars   // Number of bars in current trade
```

### Configuración y Flags
```c
set(flag);          // Set a flag
is(flag);           // Check if flag is set
resf(flag);         // Reset flag

// Flags importantes
PLOTNOW             // Plot in real-time
LOGFILE             // Write to log file
FIRSTRUN            // First run only
Init                // Initialization phase
```

---

## 🔧 KELTNER CHANNEL EN ZORRO

Keltner Channel no es un indicador built-in, pero se puede aproximar:

```c
// Keltner Channel aproximación
vars Closes = series(priceClose());
var basis = SMA(Closes, 20);        // 20-period SMA
var atr = ATR(20);                  // ATR

var kc_upper = basis + 2.5 * atr;
var kc_lower = basis - 2.5 * atr;
```

---

## 📝 ESTRUCTURA CORRECTA DE ESTRATEGIA ZORRO

```c
// ═══════════════════════════════════════════════════
// Strategy Name
// ═══════════════════════════════════════════════════

#define PERIOD_SMA  20
#define PERIOD_BB   50
#define PERIOD_ATR  175

function run()
{
    // CONFIGURACIÓN
    set(LOGFILE|PLOTNOW);
    BarPeriod = 5;          // 5-minute bars
    NumYears = 5;           // 5 years back
    LookBack = PERIOD_ATR;  // Need 175 bars
    
    // ASSET
    asset("ES");
    
    // SERIES
    vars Closes = series(priceClose());
    
    // INDICADORES
    var sma = SMA(Closes, PERIOD_SMA);
    var atr = ATR(PERIOD_ATR);
    
    // Bollinger Bands
    BBands(Closes, PERIOD_BB, 2, 2, MAType_SMA);
    
    // LÓGICA DE ENTRADA
    if (Closes[1] > sma && NumOpenLong == 0) {
        enterLong();
    }
    
    // LÓGICA DE SALIDA
    if (NumOpenLong > 0) {
        Stop = 1.4 * atr;    // Stop loss
        setProfit(2.8 * atr);  // Take profit
    }
}
```

---

## ✅ CHECKLIST PARA CREAR ESTRATEGIA

- [ ] Usar `function run()` no `void main()`
- [ ] Usar `SMA()`, no `MA()`
- [ ] Usar `series()` para crear arrays
- [ ] Usar `priceClose()`, no `close()`
- [ ] Usar nombres correctos de indicadores
- [ ] Configurar `BarPeriod` correctamente
- [ ] Configurar `asset()` con el símbolo
- [ ] Usar `enterLong()` / `exitLong()`
- [ ] Usar `NumOpenLong` para verificar posiciones
- [ ] Definir `Stop` y/o `setProfit()`

---

## 📖 REFERENCIA RÁPIDA

| Concepto | Correcto |
|----------|----------|
| Función principal | `function run()` |
| Precio actual | `price()` o `priceClose()` |
| Media móvil | `SMA(series, period)` |
| Array de datos | `series(priceClose())` |
| Barra anterior | `Close[1]` (usando series) |
| Posición abierta | `NumOpenLong > 0` |
| Entrada | `enterLong()` |
| Salida | `exitLong()` |
| Stop loss | `Stop = X * PIP` |
| Barras | `TradeBars` |
| Hora | `hour()` |

---

**Conclusión**: Mi primera conversión tuvo errores de sintaxis. Necesito crear una nueva estrategia correcta usando la sintaxis ZORRO real.

Próximo paso: Crear estrategia corregida y compilable.

