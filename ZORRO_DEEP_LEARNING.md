# 📚 ZORRO DEEP LEARNING - Complete Guide
**Based on analysis of 100+ real strategies in D:\ZORRO\Strategy\**

---

## 🏗️ ESTRUCTURA MÍNIMA DE UNA ESTRATEGIA ZORRO

```c
function run()
{
    // Configuración
    BarPeriod = 1;              // Minutos entre barras
    StartDate = 20200101;       // Fecha inicial YYYYMMDD
    EndDate = 20261231;         // Fecha final
    asset("NAS100");            // Activo a operar
    LookBack = 100;             // Barras necesarias para cálculos
    
    // Series de datos
    vars Close = series(priceClose());
    
    // Indicadores
    var sma = SMA(Close, 20);
    var atr = ATR(14);
    
    // Entrada
    if(priceClose() > sma && NumOpenLong == 0)
    {
        enterLong();
    }
    
    // Salida
    if(NumOpenLong > 0)
    {
        Stop = 2 * atr;         // 2 ATRs de stop loss
        TakeProfit = 4 * atr;   // 4 ATRs de take profit
    }
}
```

**¡CLAVE!** NO necesita `#include`, NO necesita `void main()`, NO necesita `{}` cerrado al final.

---

## 📊 CONFIGURACIÓN GLOBAL

### Timeframe y Período
```c
BarPeriod = 1;      // 1 = 1 minuto
BarPeriod = 5;      // 5 = 5 minutos
BarPeriod = 60;     // 60 = 1 hora (1440 = 1 día)
BarPeriod = 1440;   // 1 día
```

### Fechas
```c
StartDate = 20200101;   // 1 de enero de 2020
EndDate = 20261231;     // 31 de diciembre de 2026
StartDate = 2020;       // Funciona también
```

### Activos
```c
asset("NAS100");        // Nasdaq 100
asset("ES");            // S&P 500
asset("GBP/USD");       // Forex par
asset("EURUSD");        // Forex (alternativa)
asset("GC");            // Gold
asset("BTC/USD");       // Bitcoin
```

### Lookback (IMPORTANTE)
```c
LookBack = 100;  // Necesario al menos 100 barras antes de trading
```

**⚠️ ERROR COMÚN:** No tener suficiente lookback causa errores de datos.

### Configuración Avanzada
```c
set(PLOTNOW|LOGFILE|RULES);  // Flags
BarZone = ET;                 // Zona horaria (ET=Eastern, CT, MT, PT, UTC)
HistoryZone = ET;             // Zona del histórico
Spread = 2;                   // En pips
Commission = 0.1;             // Por contrato
Slippage = 0.5;               // En pips
Leverage = 1;                 // Sin apalancamiento
Lots = 1;                     // 1 contrato
```

---

## 🔄 SERIES DE DATOS (SUPER IMPORTANTE)

### Crear Series
```c
vars Close = series(priceClose());      // Array de closes
vars High = series(priceHigh());        // Array de highs
vars Low = series(priceLow());          // Array de lows
vars Open = series(priceOpen());        // Array de opens

// O acceso directo
vars C = seriesC();     // Close directo
vars H = seriesH();     // High directo
vars L = seriesL();     // Low directo
vars O = seriesO();     // Open directo
```

### Acceder a Datos en Series
```c
var close_actual = Close[0];            // Cierre actual
var close_anterior = Close[1];          // Cierre hace 1 barra
var close_hace_5 = Close[5];            // Cierre hace 5 barras
```

**¡CLAVE!** `series()` es obligatorio para crear arrays históricos.

---

## 📈 INDICADORES DISPONIBLES

### Media Móvil
```c
var sma = SMA(Close, 20);               // Media simple 20 períodos
var ema = EMA(Close, 20);               // Media exponencial 20 períodos
var wma = WMA(Close, 20);               // Media ponderada
```

### ATR (Average True Range) - VOLATILIDAD
```c
var atr = ATR(14);                      // ATR de 14 períodos
// NO NECESITA series, es función de precio directo
```

### Bollinger Bands
```c
BBands(Close, 20, 2, 2, MAType_SMA);
// Después de llamar BBands:
// rRealUpperBand  - banda superior
// rRealMiddleBand - banda media (SMA)
// rRealLowerBand  - banda inferior
```

### RSI (Relative Strength Index)
```c
var rsi = RSI(Close, 14);               // RSI de 14 períodos
// Rango: 0-100
// >70 = sobrecompra, <30 = sobreventa
```

### ROC (Rate of Change)
```c
var roc = ROC(Close, 5);                // Cambio en 5 períodos
// Positivo = subiendo, Negativo = bajando
```

### MACD
```c
MACD(Close, 12, 26, 9);
// Después:
// rValue = línea MACD
// rSignal = línea señal
```

### Otros
```c
var momentum = Momentum(Close, 10);
var stoch = Stochastic(Close, 14, 3, 3);
var cci = CCI(Close, 20);
```

---

## 💰 PRECIOS ACTUALES (sin series)

```c
priceClose()        // Cierre actual
priceOpen()         // Apertura actual
priceHigh()         // Máximo actual
priceLow()          // Mínimo actual
price()             // = priceClose()

// En PIPs
var spread = 2;     // 2 pips
var sl = 50 * PIP;  // 50 pips
```

---

## 🚀 ENTRADA Y SALIDA

### Entrar
```c
if(condition && NumOpenLong == 0)
{
    enterLong();                // Entrar con Lots contratos
}

if(condition && NumOpenShort == 0)
{
    enterShort();
}

// Con cantidad específica
enterLong(2);       // 2 contratos
enterShort(1);      // 1 contrato

// Con precio de entrada (stop/limit)
enterLong(1, priceC() - 100*PIP);       // Stop 100 pips abajo
```

### Salir
```c
if(NumOpenLong > 0 && condition)
{
    exitLong();             // Salir de todo
}

if(NumOpenShort > 0 && condition)
{
    exitShort();
}

// Salir parcialmente
exitLong(0.5);      // Salir 50% de la posición
```

### Variables de Estado
```c
NumOpenLong         // Número de contratos long abiertos
NumOpenShort        // Número de contratos short abiertos
NumOpenTotal        // Total de contratos abiertos
NumWinTotal         // Total de operaciones ganadoras
NumLossTotal        // Total de operaciones perdedoras
TradeBars           // Barras que lleva abierta la operación
```

---

## 🛑 GESTIÓN DE RIESGO (GLOBAL)

```c
Stop = 100 * PIP;       // Stop loss en pips
TakeProfit = 200 * PIP; // Take profit en pips
Trail = 50 * PIP;       // Trailing stop en pips
LifeTime = 240;         // Máximo de barras abierta (4 horas en M1)

MaxLong = 10;           // Máximo 10 contratos long abiertos
MaxShort = 10;          // Máximo 10 contratos short
MaxOpenLots = 20;       // Total máximo abierto

Lots = 1;               // Tamaño por defecto
```

**⚠️ IMPORTANTE:** Estas se asignan ANTES de `enterLong()` o `enterShort()`.

```c
// CORRECTO
Stop = 100 * PIP;
TakeProfit = 200 * PIP;
if(condition && NumOpenLong == 0)
    enterLong();

// INCORRECTO (los valores se ignoran)
if(condition && NumOpenLong == 0)
    enterLong();
Stop = 100 * PIP;
TakeProfit = 200 * PIP;
```

---

## ⏰ FUNCIONES DE TIEMPO

```c
hour()              // Hora actual (0-23)
minute()            // Minuto actual (0-59)
day()               // Día del mes (1-31)
dow()               // Día de la semana (1=Lunes, 7=Domingo)
month()             // Mes (1-12)
year()              // Año completo
date()              // Fecha actual
Now                 // Timestamp actual
TradeBars           // Barras desde entrada
```

### Ejemplos
```c
if(hour() >= 16 && hour() < 21)    // Entre 16:00 y 21:00
if(dow() != 5 && dow() != 6)       // No viernes ni sábado
if(day() == 1 || day() == 15)      // Primero o 15 del mes
```

---

## 📊 VARIABLES DE RENDIMIENTO

```c
Equity              // Patrimonio actual
Balance             // Balance de cuenta
Margin              // Margen usado
MarginFree          // Margen libre
MaxMarginLoss       // Mayor pérdida de margen
InitialEquity       // Patrimonio inicial
```

---

## 🔧 FLAGS Y CONTROL

```c
Train               // true en modo entrenamiento
is(FIRSTRUN)        // Primera ejecución del backtest
is(INITRUN)         // Inicialización del backtest
is(PLOTNOW)         // Graficar en tiempo real
```

### set()
```c
set(PLOTNOW);       // Graficar
set(LOGFILE);       // Crear archivo de log
set(RULES);         // Mostrar reglas en el log
set(PLOTNOW|LOGFILE|RULES);  // Múltiples flags
```

---

## 📈 FUNCIONES ÚTILES

### Cruzamientos
```c
crossOver(var1, var2)       // var1 cruza arriba de var2
crossUnder(var1, var2)      // var1 cruza abajo de var2
```

### Matemáticas
```c
max(a, b)           // Máximo
min(a, b)           // Mínimo
abs(x)              // Valor absoluto
pow(x, y)           // x elevado a y
sqrt(x)             // Raíz cuadrada
```

### Arrays
```c
optimize(var_name, from, to, step);  // Optimizar parámetro
```

---

## 🐛 DEBUG

```c
printf("Valor: %.2f\n", variable);
printf("Long: %d, Equity: %.0f\n", NumOpenLong, Equity);
print("Mensaje");
```

Output aparece en el archivo Log.

---

## ❌ ERRORES COMUNES

| Error | Causa | Solución |
|-------|-------|----------|
| "Undeclared identifier" | Variable no existe | Verificar sintaxis de variable |
| "No 2019 history" | Falta datos históricos | Descargar datos en ZORRO |
| "Insufficient lookback" | LookBack < barras necesarias | Aumentar LookBack |
| "Asset not in list" | Asset no existe/no descargado | Descargar o verificar nombre |
| "Close undeclared" | close() sin series | Usar `series(priceClose())` |
| Cero trades | Condición de entrada nunca se cumple | Debug con printf |

---

## 🎯 PATRÓN COMPLETO RECOMENDADO

```c
// Parámetros
#define SMA_PERIOD      20
#define ATR_PERIOD      14
#define STOP_MULT       2.0
#define PROFIT_MULT     3.0

// Variables globales
var precio_entrada = 0;

function run()
{
    // Configuración
    BarPeriod = 5;
    StartDate = 20200101;
    EndDate = 20261231;
    asset("ES");
    LookBack = max(SMA_PERIOD, ATR_PERIOD) * 2;
    
    set(PLOTNOW|LOGFILE);
    
    // Series
    vars Close = series(priceClose());
    
    // Indicadores
    var sma = SMA(Close, SMA_PERIOD);
    var atr = ATR(ATR_PERIOD);
    
    // Riesgo (ANTES de entrada)
    Stop = STOP_MULT * atr;
    TakeProfit = PROFIT_MULT * atr;
    Lots = 1;
    
    // ENTRADA
    if(!NumOpenLong && priceClose() > sma && atr > 10*PIP)
    {
        if(enterLong())
        {
            precio_entrada = priceClose();
            printf("\nENTRADA LONG en %.4f", precio_entrada);
        }
    }
    
    // SALIDA ADICIONAL (por tiempo)
    if(NumOpenLong > 0 && TradeBars > 240)
    {
        exitLong();
        printf("\nSALIDA por tiempo");
    }
}
```

---

## 🚀 CHECKLIST PARA CREAR ESTRATEGIA

- [ ] `function run()` (NO `void main()`)
- [ ] `BarPeriod` configurado
- [ ] `asset()` con símbolo válido
- [ ] `StartDate` y `EndDate` definidas
- [ ] `LookBack` >= períodos de indicadores
- [ ] `vars Close = series(priceClose());` para series
- [ ] Indicadores después de series
- [ ] `Stop`, `TakeProfit`, `Lots` ANTES de `enterLong()`
- [ ] `NumOpenLong == 0` para verificar posiciones
- [ ] `enterLong()` y `exitLong()` funciones
- [ ] NO usar `MA()`, `close()`, `Profit`, `setProfit()`
- [ ] Usar `SMA()`, `priceClose()`, `Stop`, `TakeProfit`
- [ ] Compilación sin errores en ZORRO

---

## 📚 REFERENCIA RÁPIDA SINTAXIS

| Lo que necesitas | Código correcto |
|------------------|-----------------|
| Media móvil | `SMA(Close, 20)` |
| Precio cierre | `priceClose()` o `price()` |
| Barras anteriores | `Close[1]` (con series) |
| Stop loss | `Stop = 100*PIP;` |
| Take profit | `TakeProfit = 200*PIP;` |
| Entrar long | `enterLong();` |
| Salir long | `exitLong();` |
| Chequear posición | `if(NumOpenLong > 0)` |
| Volatilidad | `ATR(14)` |
| Función principal | `function run()` |
| Crear serie | `vars C = series(priceClose());` |
| Cruzamiento | `crossOver(Fast, Slow)` |
| Hora actual | `hour()` |
| Debug | `printf("Valor: %.2f", var);` |

---

**Siguiente: Crear estrategia funcional simple basada en esto.**
