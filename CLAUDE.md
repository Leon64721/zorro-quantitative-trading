# ZORRO Quantitative Trading — Instrucciones para Claude Code

**Proyecto:** Entrenar agente IA para generar estrategias de trading en ZORRO Trader  
**Plataforma:** Zorro Trader (versión gratuita) + Lite-C  
**Estado:** Fase 3 — Validación de robustez (Monte Carlo, WFO, SPP)  
**Última actualización:** 2026-09-14

---

## 📋 CONTEXTO OBLIGATORIO

Este proyecto tiene **reglas absolutas de validación**. Lee primero: [`ZORRO_RULES.md`](./ZORRO_RULES.md)

### Regla Principal
**TODO backtest debe ejecutarse en ZORRO real. Resultados de Python, Backtrader, Excel, etc. NO cuentan.**

---

## 🎯 Objetivos del Proyecto

### Fase 1: Training (COMPLETADA ✅)
- Generar 500 estrategias aleatorias con diferentes indicadores
- Ejecutar backtesting real en ZORRO
- Entrenar agente IA a identificar patrones de rentabilidad

**Estado:** 500 estrategias generadas, corpus de datos completado, grafo de conocimiento construido

### Fase 2: Validación Robustez (EN PROGRESO 🔄)
- Screening de candidatos: seleccionar ~25 estrategias diversificadas
- Ejecutar Stage A: backtest básico en ZORRO
- Ejecutar Stage B: validación de robustez con:
  - **WFO** (Walk-Forward Optimization) — ver degradación IS→OOS
  - **MRC** (Monte Carlo Reality Check) — validar significancia estadística (p-value)
  - **Profile** (WFO Profile) — analizar rendimiento por ciclo
  - **SPP** (System Parameter Permutation) — sensibilidad a parámetros

### Fase 3: Reporting (PRÓXIMO)
- Generar reportes con veredictos: ROBUSTA / MARGINAL / OVERFIT
- Documentar hallazgos

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO
├── CLAUDE.md                          ← Este archivo
├── ZORRO_RULES.md                     ← Reglas obligatorias
├── skills/
│   └── zorro-strategy-generator/
│       ├── src/
│       │   ├── real-code-generator.js    ← Genera Lite-C válido
│       │   ├── robustness-suite.js       ← Orquestador Stage A/B
│       │   ├── asset-manager.js          ← Mapeo de símbolos
│       │   └── backtest-runner.js        ← Parseo de logs
│       └── templates/
│           └── ... (estrategias base)
├── training-results/
│   ├── strategies-metadata.json          ← Specs de 500 estrategias
│   └── robustness/
│       ├── scripts/                      ← Copias espejo de .c
│       ├── logs/                         ← Copias de .log de ZORRO
│       ├── MANIFEST.json                 ← Estado de ejecución
│       └── ROBUSTNESS_REPORT.md          ← Reportes finales
├── docs/
│   └── zorro-manual/
│       └── corpus/en/                    ← 226 archivos de documentación ZORRO
│           ├── ta.md                     ← Indicadores técnicos
│           ├── conversion.md             ← Ejemplos de estrategias reales
│           ├── trade.md                  ← Funciones de entrada/salida
│           ├── series.md                 ← Manejo de series
│           └── ... (más documentación)
└── D:\ZORRO\ (sistema externo)
    ├── Strategy/                         ← Scripts .c para backtest
    │   ├── TEST_SIMPLE_RSI.c             ← Estrategia de prueba actual
    │   └── RB_*_Base.c                   ← Scripts generados
    └── Log/                              ← Archivos .log de resultados
        └── *.txt                         ← Métricas en texto plano
```

---

## 🚀 CÓMO TRABAJAR CON ESTE PROYECTO

### 1. Estudiar Documentación ZORRO

**Antes de escribir código**, consulta:

- **Indicadores técnicos:** `docs/zorro-manual/corpus/en/ta.md`  
  Ejemplos: `RSI(vars Data, int TimePeriod)`, `SMA(vars Data, int TimePeriod)`

- **Ejemplos reales:** `docs/zorro-manual/corpus/en/conversion.md`  
  Patrones correctos de `void run()`, entrada/salida, series

- **Trade functions:** `docs/zorro-manual/corpus/en/trade.md`  
  `enterLong()`, `exitLong()`, `Stop`, `TakeProfit`, `Lots`

- **Series management:** `docs/zorro-manual/corpus/en/series.md`  
  `vars`, `series()`, `seriesC()`, `priceC()`

### 2. Generar Estrategia

```bash
node skills/zorro-strategy-generator/src/real-code-generator.js
```

Output: Archivo `.c` compilable en Zorro Lite-C

### 3. Validar en ZORRO Real

```
1. Abre: D:\ZORRO\ZORRO.exe
2. Menu → Strategy → Open File → Selecciona el .c
3. Verifica: Sin errores de compilación
4. Click [Test] → Ejecuta backtest
5. Revisa: D:\ZORRO\Log\<nombre>.txt
```

### 4. Extraer Métricas

```bash
node skills/zorro-strategy-generator/src/backtest-runner.js parse <log-file>
```

Output: Métricas parseadas (`Net Profit`, `Win Rate`, `Sharpe`, `P-Value`, etc.)

### 5. Generar Reporte

```bash
node run-robustness-suite.js stage-a --candidates 25
node run-robustness-suite.js stage-b --finalists 8
node run-robustness-suite.js parse
```

---

## ⚙️ COMANDOS PRINCIPALES

### Stage A (Screening de candidatos)

```bash
# Generar 25 scripts para screening
node run-robustness-suite.js stage-a --candidates 25

# Output:
# - D:\ZORRO\Strategy\RB_*.c (25 archivos)
# - training-results/robustness/RUN_CHECKLIST.md (guía paso a paso)
```

**Proceso manual:**
1. Abre cada script en ZORRO
2. Click [Test]
3. Espera resultado
4. El .log se genera automáticamente

### Stage B (Validación de robustez)

```bash
# Después de completar Stage A, generar variantes de robustez
node run-robustness-suite.js stage-b --finalists 8 --spp-variants 4 --mrc-cycles 150

# Output:
# - WFO variants (optimización Walk-Forward)
# - MRC wrappers (Monte Carlo Reality Check)
# - SPP variants (parámetros perturbados)
# - RUN_CHECKLIST.md actualizado
```

### Parseo de Resultados

```bash
# Leer todos los .log generados y extraer métricas
node run-robustness-suite.js parse

# Output:
# - training-results/robustness/ROBUSTNESS_REPORT.md
# - training-results/robustness/robustness-results.json
```

---

## 🔍 VERIFICACIÓN DE SÍNTESIS ZORRO

**¿Cómo confirmar que código Lite-C es válido?**

1. **Compilación:** Abre en ZORRO, verifica que NO haya errores de sintaxis
2. **Ejecución:** Click [Test], espera a que termine
3. **Output:** Archivo `.log` generado en `D:\ZORRO\Log\`
4. **Métricas:** Lee tabla de resultados en el `.log`

**Ejemplo de `.log` válido:**

```
Zorro 2.51
Trade: EUR/USD, 60-minute bars
Period: 2023-01-01 to 2024-01-01
StartCapital: 10000

=== Performance ===
Net Profit       $ 2,450.00
Total Trades:    45
Win Rate:        62%
Profit Factor:   1.85
Sharpe Ratio:    1.23
Max Drawdown:    15.4%
Return/Drawdown: 0.53
P-Value:         3.2%   [Valid, edge exists]
R2 Coefficient:  0.42   [Acceptable fit]
```

---

## 📊 ESTADO ACTUAL (2026-09-14)

### Completado ✅
- Training de 500 estrategias (specs guardados en JSON)
- Corpus de documentación ZORRO (226 archivos)
- Grafo de conocimiento sobre indicadores
- `real-code-generator.js` — genera Lite-C válido
- `robustness-suite.js` — orquestador Stage A/B
- Reglas obligatorias documentadas

### En Progreso 🔄
- **TEST_SIMPLE_RSI.c** — estrategia de prueba simple (WIP)
  - Problema anterior: sintaxis incorrecta (`RSI(14)` vs `RSI(seriesC(), 14)`)
  - Status: Corregido, LISTO para probar en ZORRO
  
### Próximo 🎯
- Ejecutar TEST_SIMPLE_RSI en ZORRO y validar
- Generar Stage A (25 candidatos)
- Ejecutar 25 backtests manuales en ZORRO
- Seleccionar 8 finalists basados en métricas reales
- Ejecutar Stage B (WFO, MRC, SPP) en finalists
- Generar ROBUSTNESS_REPORT.md

---

## 🚫 PROHIBICIONES EXPLÍCITAS

❌ **NUNCA:**
- Afirmar que un backtest es "validado en ZORRO" si solo se simuló en Python
- Usar `Math.random()` para generar métricas y llamarlas "resultados reales"
- Escribir código sin consultar `docs/zorro-manual/corpus/en/`
- Generar estrategias sin ejecutarlas en ZORRO real
- Ignorar errores de compilación en Lite-C

✅ **SIEMPRE:**
- Compilar en ZORRO antes de reclamar validez
- Extraer métricas del `.log` real
- Documentar: archivo, versión Zorro, asset, BarPeriod, LookBack, fechas, `.log` ubicación
- Leer ejemplos en `conversion.md` cuando hayas dudas de sintaxis
- Validar en ZORRO primero, optimizar después

---

## 📞 RECURSOS

**Documentación ZORRO:**
- Ruta: `docs/zorro-manual/corpus/en/`
- Archivos clave: `ta.md`, `conversion.md`, `trade.md`, `series.md`, `bar.md`

**Código del Proyecto:**
- Generator: `skills/zorro-strategy-generator/src/real-code-generator.js`
- Suite: `skills/zorro-strategy-generator/src/robustness-suite.js`
- CLI: `run-robustness-suite.js`

**Datos:**
- Estrategias: `training-results/strategies-metadata.json` (500 specs)
- Resultados: `training-results/robustness/robustness-results.json`

**GitHub:**
- Repo: https://github.com/Leon64721/zorro-quantitative-trading
- Branch: `master`

---

## 👤 NOTAS PARA CLAUDE CODE

1. **Siempre leer ZORRO_RULES.md primero** — son reglas no negociables
2. **Estudiar ejemplos reales en conversion.md** — NO adivinar sintaxis
3. **Compilar en ZORRO antes de afirmar validez** — sin excepciones
4. **Extraer métricas del .log** — nunca de Python/simuladores
5. **Documentar completamente cada ejecución** — ruta, asset, fechas, .log ubicación, métricas

---

**Creado:** 2026-09-14 por Claude Code  
**Última actualización:** 2026-09-14  
**Mantenedor:** Leon64721 (ZORRO Community)
