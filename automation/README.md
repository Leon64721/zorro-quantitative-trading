# AUTOMATIZACIÓN DE BACKTESTS EN ZORRO TRADER

**Propósito:** Ejecutar backtests reales dentro de ZORRO.exe desde PowerShell, sin simulaciones externas.

**Estado:** ✅ Scripts preparados, listos para prueba controlada

---

## 📋 Estructura

```
automation/
  discover_zorro_cli.ps1         # Detecta ZORRO y su configuración
  run_one_backtest.ps1           # Ejecuta 1 backtest y valida ejecución real
  run_batch_backtests.ps1        # Orquestador: ejecuta múltiples backtests
  parse_zorro_result.ps1         # Extrae métricas del log de ZORRO
  README.md                       # Este archivo
  results/
    raw/                          # Copias de logs originales
    parsed/                       # Logs parseados a JSON
    manifests/                    # Manifiestos de ejecución
```

---

## 🚀 INICIO RÁPIDO

### 1. Descubrir ZORRO

```powershell
cd "E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO\automation"
.\discover_zorro_cli.ps1 -ZorroPath "D:\ZORRO"
```

**Salida esperada:**
```
✅ ZORRO.exe encontrado: D:\ZORRO\ZORRO.exe
   Versión: 3.0.1.6
   ✅ Strategy: D:\ZORRO\Strategy
   ✅ Log: D:\ZORRO\Log
   CLI argumentos: -run <script_name>
```

### 2. Ejecutar 1 Backtest (TEST_SIMPLE_RSI)

```powershell
.\run_one_backtest.ps1 -StrategyName "TEST_SIMPLE_RSI" -ZorroPath "D:\ZORRO"
```

**Lo que hace:**
1. ✅ Verifica que `TEST_SIMPLE_RSI.c` existe
2. ✅ Guarda hash del log existente (si existe)
3. 🔄 Ejecuta: `ZORRO.exe -run TEST_SIMPLE_RSI`
4. ⏳ Espera resultado (máximo 120 segundos)
5. ✅ Verifica que el log fue actualizado
6. 📊 Crea manifiesto JSON con evidencia de ejecución
7. 📄 Muestra primeras líneas del log

**Output esperado:**
```
🚀 EJECUTANDO BACKTEST EN ZORRO
✅ ZORRO.exe válido
✅ Estrategia encontrada

📋 Estado del log ANTES:
   Existe: SÍ
   Hash: 8f2c3a9e... 

🔄 Iniciando ZORRO.exe...
   PID: 12345
   Esperando resultado (máximo 120s)...

✅ ZORRO terminó
   Código de salida: 0
   Duración: 45s

✅ El log fue actualizado por ZORRO

📄 Contenido del log:
   Strategy: TEST_SIMPLE_RSI
   Asset: EUR/USD
   Period: 2020-01-01 to 2025-12-31
   Net Profit: -$80.14
   Total Trades: 347
   Win Rate: 38.6%
   ...

📊 RESUMEN DE EJECUCIÓN
================================
Estrategia:         TEST_SIMPLE_RSI
Duración:           45s
Log actualizado:    SÍ ✅
Archivo log:        D:\ZORRO\Log\TEST_SIMPLE_RSI.txt
================================
```

### 3. Parsear el Resultado

```powershell
.\parse_zorro_result.ps1 -LogFile "D:\ZORRO\Log\TEST_SIMPLE_RSI.txt"
```

**Output esperado:**
```
✅ Estrategia: TEST_SIMPLE_RSI
✅ Asset: EUR/USD

📊 MÉTRICAS EXTRAÍDAS:
================================
Estrategia:         TEST_SIMPLE_RSI
Asset:              EUR/USD
Período:            2020-01-01 a 2025-12-31
Net Profit:         $-80.14
Total Trades:       347
Win Rate:           38.6%
Profit Factor:      0.93
Sharpe Ratio:       -0.27
Max Drawdown:       3951.8%
Annual Return:      -7%
Capital Final:      $186
================================

✅ Resultado parseado guardado: D:\ZORRO\Log\TEST_SIMPLE_RSI.parsed.json
```

### 4. Ejecutar Múltiples Backtests

```powershell
.\run_batch_backtests.ps1 -Strategies @("TEST_SIMPLE_RSI", "Strategy2", "Strategy3") -ZorroPath "D:\ZORRO"
```

---

## 📊 VALIDACIÓN DE EJECUCIÓN REAL

El script **`run_one_backtest.ps1`** verifica 5 condiciones para confirmar que ZORRO ejecutó realmente el backtest:

### 1. ✅ Archivo .c existe
```powershell
if (-not (Test-Path $strategyFile)) { exit }
```

### 2. ✅ ZORRO.exe se ejecuta y termina
```powershell
$process = Start-Process -FilePath $zorroExe -ArgumentList "-run $StrategyName" ...
$finished = $process.WaitForExit(...)
```

### 3. ✅ El log se actualiza (hash y fecha cambian)
```powershell
$logHashBefore = (Get-FileHash $logFile).Hash
# ... ejecutar ZORRO ...
$logHashAfter = (Get-FileHash $logFile).Hash
$logUpdated = ($logHashBefore -ne $logHashAfter)
```

### 4. ✅ El log contiene contenido válido
```powershell
$strategyLine = Get-Content $logFile | Where-Object { $_ -match "^Strategy:" }
```

### 5. ✅ Código de salida es 0
```powershell
if ($exitCode -eq 0) { execution_status = "BACKTEST_EXECUTED" }
```

**Si TODAS pasan → `execution_status = "BACKTEST_EXECUTED"`**

---

## 📄 MANIFESTOS JSON

Cada ejecución crea un manifiesto en `results/manifests/`:

```json
{
  "strategy_name": "TEST_SIMPLE_RSI",
  "strategy_file": "D:\\ZORRO\\Strategy\\TEST_SIMPLE_RSI.c",
  "zorro_path": "D:\\ZORRO",
  "zorro_version": "3.0.1.6",
  "launch_command": "-run TEST_SIMPLE_RSI",
  "start_time": "2026-09-14 17:45:30",
  "end_time": "2026-09-14 17:46:15",
  "duration_seconds": 45,
  "exit_code": 0,
  "log_path": "D:\\ZORRO\\Log\\TEST_SIMPLE_RSI.txt",
  "log_exists": true,
  "log_updated": true,
  "log_hash_before": "8f2c3a9e...",
  "log_hash_after": "d4e5f6a7...",
  "execution_status": "BACKTEST_EXECUTED",
  "timestamp": "2026-09-14 17:46:20"
}
```

---

## 🔍 RESULTADO PARSEADO

El log de ZORRO se convierte en JSON (`TEST_SIMPLE_RSI.parsed.json`):

```json
{
  "log_file": "D:\\ZORRO\\Log\\TEST_SIMPLE_RSI.txt",
  "parse_timestamp": "2026-09-14 17:46:35",
  "strategy_name": "TEST_SIMPLE_RSI",
  "asset": "EUR/USD",
  "period_start": "2020-01-01",
  "period_end": "2025-12-31",
  "net_profit": -80.14,
  "total_trades": 347,
  "win_rate": 38.6,
  "profit_factor": 0.93,
  "sharpe_ratio": -0.27,
  "max_drawdown": 3951.8,
  "annual_return": -7,
  "capital_final": 186,
  "p_value": null,
  "r_squared": null,
  "raw_lines": [
    "Strategy: TEST_SIMPLE_RSI",
    "Asset: EUR/USD",
    "Period: 2020-01-01 to 2025-12-31",
    "Net Profit: -80.14",
    ...
  ]
}
```

---

## ✅ BASELINE DE TEST_SIMPLE_RSI

**Resultado validado en ZORRO (ejecución anterior):**

```
Strategy: TEST_SIMPLE_RSI
Asset: EUR/USD
Period: 2020-2025

Net Profit:      -$80.14
Total Trades:    347
Win Rate:        38.6%
Profit Factor:   0.93
Sharpe Ratio:    -0.27
Max Drawdown:    3951.8%
Annual Return:   -7%
Capital Final:   $186
```

**Este baseline NO debe modificarse.**

Cuando ejecutemos nuevamente, compararemos contra él:
- ✅ Si métrica coincide → OK
- ⚠️ Si métrica cambia → algo cambió en la estrategia o datos

---

## ⚠️ RESTRICCIONES OBLIGATORIAS

### ❌ NO HACER

- ❌ Ejecutar Python para simular backtests (resulta en FALSOS POSITIVOS)
- ❌ Cambiar código de `TEST_SIMPLE_RSI.c` durante la validación
- ❌ Ejecutar múltiples ZORRO.exe en paralelo hasta confirmar que es seguro
- ❌ Afirmar "backtest ejecutado" sin manifiesto + log + metricas

### ✅ HACER

- ✅ Ejecutar 1 estrategia primero
- ✅ Verificar manifiesto JSON + log actualizado
- ✅ Comparar resultado con baseline
- ✅ Solo después: escalar a 5, 10, 25+ estrategias

---

## 🔄 PROCEDIMIENTO DE ESCALAMIENTO

### Fase 1: Test Controlado (HOY)
```powershell
# Ejecutar 1 estrategia
.\run_one_backtest.ps1 -StrategyName "TEST_SIMPLE_RSI"

# Verificar:
# - Manifiesto creado
# - Log actualizado
# - Métricas parseadas
# - Resultado vs baseline coincide
```

### Fase 2: 5 Estrategias
```powershell
# Ejecutar 5
.\run_batch_backtests.ps1 -Strategies @("TEST_SIMPLE_RSI", "S2", "S3", "S4", "S5")

# Revisar manualmente cada log
# Confirmar que no hay conflictos entre ejecuciones
```

### Fase 3: 10-25 Estrategias
```powershell
# Ejecutar lote
.\run_batch_backtests.ps1 -Strategies $("TEST_SIMPLE_RSI", "S2", ..., "S25")

# Aún secuencial (no paralelo) hasta confirmar estabilidad
```

### Fase 4: Optimización
```powershell
# SOLO después de Fase 3 exitosa:
# - Investigar paralelismo (Start-Job)
# - Monitorear archivos History/Log/Cache
# - Escalar a 100+ backtests
```

---

## 🛠️ TROUBLESHOOTING

### Problema: "ZORRO.exe no encontrado"

**Solución:** Verificar ruta en Zorro.ini

```powershell
Get-ChildItem "D:\ZORRO\ZORRO.exe"
```

### Problema: "Execution status: EXECUTION_INCOMPLETE"

**Causa:** El log no fue actualizado. Posibles razones:
- ZORRO no ejecutó (kill process)
- Timeout insuficiente
- Estrategia tiene errores de compilación
- Datos (History) no existen

**Solución:**
```powershell
# Revisar D:\ZORRO\Log\Errors.txt
Get-Content "D:\ZORRO\Log\Errors.txt"

# Intentar manualmente en GUI de ZORRO
```

### Problema: "Log existe pero métrica es NULL"

**Causa:** Patrón de regex no capturó la línea

**Solución:** Editar `parse_zorro_result.ps1` y agregar patrón faltante

---

## 📈 PRÓXIMOS PASOS

1. **HOY:** Ejecutar `run_one_backtest.ps1` para TEST_SIMPLE_RSI
2. **HOY+1:** Comparar resultado real vs baseline
3. **Día 2:** Ejecutar 5 estrategias con `run_batch_backtests.ps1`
4. **Día 3:** Revisar manifiestos y logs manualmente
5. **Día 4:** Escalar a 25 candidatos de Stage A
6. **Día 5+:** Stage B (WFO, MRC, SPP)

---

**Creado:** 2026-09-14  
**Estado:** Scripts preparados, prueba controlada pendiente  
**Validación:** Solo ejecuta backtests reales dentro de ZORRO.exe, no simulaciones externas
