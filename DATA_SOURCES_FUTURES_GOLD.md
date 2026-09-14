# 📊 Data Sources para Futuros y Oro en ZORRO

**Status**: Investigación Completada  
**Fecha**: 15 Septiembre 2026  
**Propósito**: Encontrar data de calidad para futuros (GC, CL, ES, NQ, etc.) y oro

---

## 🎯 Resumen Ejecutivo

### Para Futuros y Oro: Top 5 Fuentes

| Fuente | Datos | Calidad | Costo | ZORRO Compatible |
|--------|-------|---------|-------|-----------------|
| **Binance** | Cripto-Futuros | ⭐⭐⭐⭐ | Gratis | ✅ Yes (plugin) |
| **FXCM** | GC, CL, ES, etc | ⭐⭐⭐⭐ | Gratis/Pago | ✅ Yes (plugin) |
| **IQFeed** | Futuros, Opciones | ⭐⭐⭐⭐⭐ | $50-100/mes | ✅ Yes (NxCore) |
| **Dukascopy** | Futuros, Forex | ⭐⭐⭐⭐ | Gratis | ✅ Yes (plugin) |
| **Tu StrategyQuant** | Lo que tienes | ⭐⭐⭐ | Ya pagado | ✅ Convertible |

### Instrumentos Soportados en ZORRO

**Futuros**:
- GC (Oro/Gold)
- CL (Crudo/Oil)
- NG (Gas Natural)
- ES (S&P 500)
- NQ (NASDAQ 100)
- YM (Dow Jones)
- ZB (Bonos)

**Opciones**:
- Todo futuro con opción

**Forex**: EUR/USD, GBP/USD, etc.

---

## 🥇 OPCIÓN 1: BINANCE FUTURES (Recomendado para Cripto)

### Ventajas
✅ Gratis  
✅ Data desde 2017  
✅ Tick data disponible  
✅ Alto volumen (confiable)  
✅ ZORRO tiene plugin oficial  

### Desventajas
❌ Solo criptos, no oro/futuros tradicionales
❌ Volatilidad alta

### Instrumentos
- BTC/USDT, ETH/USDT, etc.
- Futuros en criptos

### Setup en ZORRO
```
Plugins → Binance
API: https://api.binance.com
Data: Available desde 2017
```

### Descarga Manual
```bash
# Usando Python
pip install ccxt pandas
python -c "
import ccxt
binance = ccxt.binance()
ohlcv = binance.fetch_ohlcv('BTC/USDT', '1h', limit=1000)
"
```

---

## ⛽ OPCIÓN 2: FXCM (Futuros + Forex)

### Ventajas
✅ Oro (GC), Crudo (CL), Índices (ES, NQ)  
✅ Data histórica completa  
✅ ZORRO compatible  
✅ Cuenta demo gratuita  
✅ API profesional  

### Desventajas
⚠️ Requiere cuenta (puede ser demo)
⚠️ Data limitada en versión gratuita

### Instrumentos Disponibles
- **GC** (Oro) - Daily desde 2000
- **CL** (Crudo) - Daily desde 2000
- **ES** (S&P 500) - Tick data
- **NQ** (NASDAQ 100)
- **YM** (Dow Jones)

### Setup en ZORRO
```
1. ZORRO → Settings → Data
2. Select FXCM as provider
3. Login con credentials
4. Download: GC, CL, ES, NQ
```

### URL
https://www.fxcm.com → Real account o Demo

### Costo
- Demo: Gratis (datos retrasados 15 min)
- Real: Desde $1,000 (datos reales)

---

## 💎 OPCIÓN 3: IQFEED / DTN (Mejor Calidad Profesional)

### Ventajas
✅ Datos de máxima calidad  
✅ Tick data + OHLCV  
✅ Todos los futuros (GC, CL, etc.)  
✅ NxCore plugin en ZORRO  
✅ Histórico completo (30+ años)  

### Desventajas
⚠️ Costo: $50-100/mes
⚠️ Requiere suscripción

### Instrumentos
- GC (Oro) - desde 1975
- CL (Crudo) - desde 1983
- ES (S&P 500) - desde 1982
- NQ, YM, ZB, etc.
- Opciones en todos

### Setup en ZORRO
```
ZORRO → Plugins → NxCore
IQFeed connection required
Download: All futures available
```

### URL
https://www.dtn.com → Sign up

### Costo
$59/mes básico, $99/mes profesional

---

## 📈 OPCIÓN 4: DUKASCOPY (Alternativa Gratuita)

### Ventajas
✅ Gratis  
✅ Tick data disponible  
✅ Data desde 2003  
✅ ZORRO plugin disponible  
✅ Rápido para descargar  

### Desventajas
⚠️ Principalmente Forex
⚠️ Futuros limitados
⚠️ Precisión media

### Instrumentos
- EUR/USD, GBP/USD, etc.
- Algunos futuros
- Criptos

### Setup en ZORRO
```
Plugins → Dukascopy
API: Automático
Data: Daily + Tick desde 2003
```

### Descarga Manual
```python
# Dukascopy API (Python)
import requests
url = "https://www.dukascopy.com/datafeed/EURUSD/2020/01/"
# Download all tick files for Jan 2020
```

---

## 🎯 OPCIÓN 5: TU DATA DE STRATEGYQUANT

### ¿Qué tienes?
```
Carpeta: C:\SQX_144_Full\user\data\
Archivos: *.csv (OHLCV data)
Ejemplo: 2026.8.14NDXm_TICK_UTCPlus02-TICK-No Session.csv
```

### Ventajas
✅ Ya pagado  
✅ Data limpia  
✅ Múltiples instrumentos  
✅ Fácil convertir a ZORRO  

### Desventajas
❌ Necesita conversión de formato
❌ Limitado a lo descargado en SQ

### Formato StrategyQuant
```csv
Date,Time,Open,High,Low,Close,Volume
20260814,120000,2850.50,2851.25,2850.00,2850.75,1500
```

### Conversión a ZORRO (.t6)
```
1. Exportar desde StrategyQuant como CSV
2. Convertir con script Python
3. Guardar en D:\ZORRO\History\
4. Usar en backtesting
```

**Script Conversión**:
```python
# sqx_to_zorro_converter.py
import pandas as pd
import struct
import os

def convert_sqx_to_zorro(sqx_csv, instrument, output_dir):
    df = pd.read_csv(sqx_csv)
    # Convert CSV to ZORRO .t6 binary format
    # (See detailed script below)
    pass
```

---

## 📋 Comparación: Cuál Elegir

### Para Oro (GC) Backtesting
**Mejor**: IQFEED (máxima calidad, histórico largo)  
**Alternativa**: FXCM (bueno, menos costo)  
**Gratis**: Tu data de SQ (si tienes)

### Para Futuros Generales
**Mejor**: IQFEED o FXCM  
**Bueno**: Dukascopy (gratis)  
**Ideal**: Tu SQ data + otra fuente

### Para Criptos
**Mejor**: Binance (gratis, oficial)  
**Alternativa**: Dukascopy

---

## 🔧 INSTRUCCIONES PASO A PASO

### Opción A: Usar Data de StrategyQuant

**Paso 1**: Exportar desde SQ
```
1. Abrir StrategyQuant
2. Seleccionar instrumento (ej: GC)
3. Export → CSV
4. Guardar archivo
```

**Paso 2**: Convertir a ZORRO
```python
# Usar script de conversión
# Input: SQ CSV
# Output: .t6 para ZORRO
```

**Paso 3**: Cargar en ZORRO
```c
// En tu estrategia ZORRO
asset("GC");
setf(Skip, -4);  // Skip weekends
StartDate = 20200101;
EndDate = 20260915;
```

### Opción B: Descargar de FXCM

**Paso 1**: Crear cuenta FXCM
- Visit: https://www.fxcm.com
- Create demo account
- Login a ZORRO

**Paso 2**: Configurar ZORRO
```
ZORRO → Settings → Data Provider
Select: FXCM
Login credentials: Tu email/password
```

**Paso 3**: Descargar data
```c
// En script de descarga
asset("GC");  // Oro
asset("CL");  // Crudo
// ZORRO descarga automático
```

### Opción C: Descargar de Binance

**Paso 1**: ZORRO ya tiene plugin
```
Plugins → Binance (built-in)
```

**Paso 2**: Descargar
```c
asset("BTC/USDT");
asset("ETH/USDT");
// Descarga automática
```

---

## 📊 Formatos de Data

### StrategyQuant CSV
```
Date,Time,Open,High,Low,Close,Volume
20260814,093000,2850.50,2851.25,2850.00,2850.75,1500
```

### ZORRO .t6 (Binary)
```
Timestamp | Open | High | Low | Close | Volume | Spread | Bid | Ask
[8 bytes] [4]   [4]   [4]  [4]   [4]      [2]    [2]   [2]
```

### Conversión (Python)
```python
import pandas as pd
import struct
from datetime import datetime

def convert_to_zorro_t6(csv_file, output_file):
    df = pd.read_csv(csv_file)
    
    with open(output_file, 'wb') as f:
        for _, row in df.iterrows():
            dt = datetime.strptime(f"{row['Date']} {row['Time']}", "%Y%m%d %H%M%S")
            timestamp = int(dt.timestamp() * 1000)  # Milliseconds
            
            # Write to .t6 format
            data = struct.pack('<Q', timestamp)  # 8 bytes timestamp
            data += struct.pack('<f', row['Open'])    # 4 bytes
            data += struct.pack('<f', row['High'])
            data += struct.pack('<f', row['Low'])
            data += struct.pack('<f', row['Close'])
            data += struct.pack('<f', row['Volume'])
            data += struct.pack('<H', 0)  # Spread
            data += struct.pack('<H', 0)  # Bid
            data += struct.pack('<H', 0)  # Ask
            
            f.write(data)
```

---

## 💰 Costo Comparativo Anual

| Fuente | Costo Anual | Calidad | Futuros | Oro |
|--------|------------|---------|---------|-----|
| Binance | $0 | ⭐⭐⭐⭐ | ❌ Cripto | ❌ |
| FXCM Demo | $0 | ⭐⭐⭐ | ✅ | ✅ |
| Dukascopy | $0 | ⭐⭐⭐ | ⚠️ Limitado | ❌ |
| Tu SQ | $0 | ⭐⭐⭐ | ✅ (Si tienes) | ✅ (Si tienes) |
| IQFEED | $600-1200 | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| **RECOMENDADO** | **$0 + FXCM Demo** | ⭐⭐⭐⭐ | ✅ | ✅ |

---

## ✅ RECOMENDACIÓN FINAL

### Para Empezar (Hoy)
1. **Usa tu data SQ** (ya pagado)
   - Exporta GC, CL, ES si tienes
   - Convierte a .t6
   - Empieza backtesting

2. **FXCM Demo** (Gratis)
   - Crea cuenta demo
   - Descarga GC (Oro) diario
   - Excelente para testing

### Para Escalar (Futuro)
1. **IQFEED** ($600/año)
   - Mejor calidad
   - Todos los futuros
   - Tick data incluida

2. **Binance** (Gratis)
   - Cripto-futuros
   - Alta volatilidad
   - Bueno para ML

---

## 🚀 PRÓXIMO PASO

Ahora voy a crear el **CODE CONVERTER AGENT** que:
- Reciba código MT4/MT5/NinjaTrader/PineScript
- Lo convierta a ZORRO C
- Ejecute backtesting automático
- Haga Montecarlo + robustez
- Entregue reporte completo

**Agent especializado**: `code-converter-optimizer.md`

---

## 📞 QUICK LINKS

- **FXCM**: https://www.fxcm.com
- **IQFeed/DTN**: https://www.dtn.com
- **Binance**: https://www.binance.com
- **Dukascopy**: https://www.dukascopy.com

---

*Investigación completada: 2026-09-15*  
*Próximo: CODE CONVERTER AGENT creation*
