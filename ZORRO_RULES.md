# ⚠️ REGLAS OBLIGATORIAS PARA ZORRO TRADER

**Contexto del proyecto:** Zorro Trader (versión gratuita) + Lite-C

---

## 🚫 REGLA PRINCIPAL

**TODO backtest declarado como válido DEBE ejecutarse realmente dentro de Zorro.**

❌ NO válido: Resultados de Python, pandas, Backtrader, vectorbt, Excel, simuladores externos  
✅ VÁLIDO: Ejecución real en `ZORRO.exe` con archivo `.log` generado por Zorro

---

## 📋 REGLAS DE CÓDIGO LITE-C

| Regla | Descripción |
|-------|-------------|
| **Compatibilidad** | Solo Lite-C compatible con Zorro. NO C++, C#, Python, JavaScript |
| **Función principal** | Toda estrategia DEBE tener `void run()` |
| **Configuración obligatoria** | `BarPeriod`, `LookBack`, `StartDate`, `EndDate` |
| **Asset** | Llamar `asset()` ANTES de cualquier operación |
| **Riesgo** | Definir `Stop`, `TakeProfit`, `Lots` ANTES de `enterLong()`/`enterShort()` |
| **Datos** | Verificar disponibilidad de datos antes de backtest |
| **Validaciones** | Evitar divisiones por cero, índices fuera de rango |
| **Funciones restringidas** | NO usar funciones exclusivas de Zorro S sin confirmación |

---

## 📊 EVIDENCIA OBLIGATORIA DE BACKTEST VÁLIDO

**Un backtest es válido si incluye TODOS estos puntos:**

1. ✅ Ruta del archivo `.c` ejecutado
2. ✅ Comando o configuración usada para iniciar Zorro
3. ✅ Versión exacta de Zorro (ej: `Zorro 2.51`)
4. ✅ Asset utilizado (ej: `EUR/USD`, `SPX500`)
5. ✅ Fuente y formato de datos (ej: `Dukascopy tick data`)
6. ✅ `BarPeriod` (ej: `60` = 1 hora)
7. ✅ `LookBack` (ej: `252` barras)
8. ✅ `StartDate` y `EndDate` (ej: `2023-01-01` a `2024-01-01`)
9. ✅ Archivo `.log` generado por Zorro (`D:\ZORRO\Log\*.txt`)
10. ✅ Métricas extraídas del `.log` real (Net Profit, Win Rate, Sharpe, etc.)
11. ✅ Confirmación: **Sin errores de compilación o ejecución**

---

## 🔄 PROCESO DE TRABAJO OBLIGATORIO

### Paso 1: Inspeccionar repositorio
- Localizar archivo `.c` real en `D:\ZORRO\Strategy\`

### Paso 2: Compilar en Zorro
- Abrir `ZORRO.exe`
- Menu → Strategy → Open File → Seleccionar `.c`
- Verificar que compila sin errores en la consola

### Paso 3: Resolver errores Lite-C
- Leer exactamente el error: línea, tipo, descripción
- **Estudiar documentación oficial** (no adivinar)
- Corregir y reintentar

### Paso 4: Ejecutar backtest mínimo
- Click `[Test]` (para verificación rápida)
- O Click `[Train]` (para optimización)
- Esperar a que termine

### Paso 5: Revisar archivo `.log`
- Ubicación: `D:\ZORRO\Log\<nombre_script>.txt`
- Verificar métricas: Net Profit, Win Rate, Profit Factor, Sharpe
- Buscar línea: `P-Value`, `Confidence`, `R2`

### Paso 6: Documentar resultado
- Copiar archivo `.log` a repositorio
- Registrar comando/configuración usada
- Extraer métricas al JSON o reporte

### Paso 7: Validación cruzada
- Comparar resultado contra cualquier análisis externo (si aplica)
- SOLO si coinciden, marcar como validado

### Paso 8: Escalamiento
- **SOLO después** de validación: agregar WFO, Monte Carlo, SPP
- No optimizar código no validado

---

## 🚨 PROHIBICIONES EXPLÍCITAS

| ❌ Prohibido | ✅ Permitido |
|----------|-----------|
| Afirmar que un backtest es "de Zorro" si solo se simuló en Python | Decir "simulado en Python, NO validado en Zorro" |
| Generar métricas con `Math.random()` | Correr backtest real en Zorro |
| Usar código sin compilar en Zorro | Mostrar archivo `.c` compilado + `.log` |
| Copiar resultados de otros traders sin verificar | Verificar personalmente en Zorro cada estrategia |
| Usar indicadores/funciones sin confirmar sintaxis en docs | Estudiar `ta.md`, `conversion.md`, ejemplos reales |

---

## 📚 DOCUMENTACIÓN ZORRO DE REFERENCIA

- **Technical Indicators:** `ta.md` (RSI, MACD, SMA, etc.)
- **Code Conversion:** `conversion.md` (ejemplos reales de estrategias)
- **Trade Functions:** `trade.md` (enterLong, exitLong, Stop, TakeProfit)
- **Data & Series:** `series.md` (vars, series(), priceC(), etc.)

**Siempre consultar la documentación ANTES de escribir código.**

---

## ✍️ EJEMPLO DE BACKTEST VÁLIDO

```
Archivo: D:\ZORRO\Strategy\TEST_SIMPLE_RSI.c

Ejecución:
- Zorro versión: 2.51
- Comando: ZORRO.exe → Menu Strategy → Test
- Asset: EUR/USD
- Datos: Dukascopy EURUSD M60 (2023-2024)
- BarPeriod: 60 (minutos)
- LookBack: 100 barras
- StartDate: 2023-01-01
- EndDate: 2024-01-01

Resultado (.log):
- Net Profit: $2,450
- Total Trades: 45
- Win Rate: 62%
- Profit Factor: 1.85
- Sharpe Ratio: 1.23

Status: ✅ VALIDADO EN ZORRO (sin errores de compilación)
```

---

**ÚLTIMA ACTUALIZACIÓN:** 2026-09-14  
**AUTOR:** Claude Code  
**CONTEXTO:** Proyecto ZORRO Community
