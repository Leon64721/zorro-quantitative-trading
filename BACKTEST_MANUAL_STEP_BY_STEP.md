# 🚀 BACKTEST MANUAL STEP-BY-STEP GUIDE
## Strategy_1_1_133_CORRECTED on ES (S&P 500)

**Date**: 2026-09-13  
**Objective**: Run backtest with correct ZORRO syntax  
**Strategy**: STRATEGY_1_1_133_CORRECTED.c  
**Asset**: ES (S&P 500 Micro Futures)  
**Timeframe**: M5 (5-minute bars)  
**Account**: $10,000 fixed 1 contract  
**Period**: 2020-01-01 to 2026-12-31

---

## ✅ PASO 1: ABRIR ZORRO.EXE

1. **Abre File Explorer** → Navega a `D:\ZORRO\`
2. **Doble-click** en `ZORRO.exe`
3. Espera a que se abra la interfaz gráfica (tarda 30-60 segundos)
4. Verás la ventana principal de ZORRO con:
   - Menu bar superior (File, Edit, View, Run, etc)
   - Área central blanca (Strategy Editor)
   - Status bar inferior

**✓ Confirmación**: Ventana de ZORRO abierta y visible

---

## ✅ PASO 2: CARGAR LA ESTRATEGIA

### Opción A: Usando el Menú
1. **Click en `File` → `Open`** (o presiona **Ctrl+O**)
2. Se abre el File Dialog
3. Navega a: `D:\ZORRO\Strategy\`
4. **Selecciona** `STRATEGY_1_1_133_CORRECTED.c`
5. **Click en `Open`**

### Opción B: Usando la Carpeta Strategy (más fácil)
1. En la ventana de ZORRO, mira la parte inferior izquierda
2. Verás una carpeta llamada **"Strategy"** (o enlace a ella)
3. **Click derecho** en `STRATEGY_1_1_133_CORRECTED.c`
4. **Click en `Load` o `Open`**

**✓ Confirmación**: El código de la estrategia aparece en el área central del editor

---

## ✅ PASO 3: COMPILAR LA ESTRATEGIA

1. **Click en el botón `Test`** en la toolbar (o presiona **Ctrl+T**)
   - O: **Menu → Run → Test**
2. ZORRO compilará el código
3. Mira la **Status bar inferior** para mensajes:
   - ✅ **"Compilation OK"** = Éxito
   - ❌ **"MA undeclared identifier"** = Error (pero ya lo corregimos)

**Si hay errores**:
- Lee el mensaje de error en el status bar
- Revisa la línea indicada en el código
- Contáctame para corregir

**✓ Confirmación**: Ves "Compilation OK" en la status bar

---

## ✅ PASO 4: CONFIGURAR PARÁMETROS DEL BACKTEST

Antes de ejecutar el backtest, configura los parámetros:

1. **Abre la ventana de configuración**:
   - **Menu → Run → Backtest Settings**
   - O presiona **Ctrl+P** (en algunas versiones)

2. **Configura estos parámetros**:
   ```
   Asset:           ES (S&P 500)
   Timeframe:       M5 (5 minutes)
   Starting Date:   2020-01-01
   Ending Date:     2026-12-31
   Account:         $10,000
   Leverage:        1.0 (no leverage)
   Contracts:       1 (fixed 1 contract)
   ```

3. **Si no ves una ventana de configuración**:
   - ZORRO usa los parámetros del código
   - La estrategia ya tiene los parámetros correctos:
     ```c
     BarPeriod = 5;        // 5 minutes
     asset("ES");          // S&P 500
     StartDate = 20200101;
     EndDate = 20261231;
     ```

**✓ Confirmación**: Parámetros configurados correctamente

---

## ✅ PASO 5: EJECUTAR EL BACKTEST

1. **Click en el botón `TEST`** (si aún está visible)
   - O: **Menu → Run → Backtest**
   - O presiona **Ctrl+T** nuevamente

2. ZORRO comenzará el backtest:
   - Verás una barra de progreso (o indicador)
   - Dice algo como: "Testing 2020-01-01 to 2026-12-31..."
   - Espera entre 2-5 minutos (depende de tu máquina)

3. **Mientras se ejecuta**:
   - NO cierres ZORRO
   - NO hagas clic en otros lugares
   - Mantén la ventana enfocada

**✓ Confirmación**: Ves el progreso en pantalla

---

## ✅ PASO 6: REVISAR LOS RESULTADOS

Una vez que el backtest termina, verás:

### En la pantana principal:
- **Gráfico de equity** (línea roja/azul subiendo/bajando)
- **Trades realizados** (puntos verdes = entrada, rojo = salida)
- **Estadísticas** en la parte inferior:

```
Total Trades:    [número de operaciones]
Win Rate:        [% ganancias]
Profit Factor:   [relación ganancias/pérdidas]
Sharpe Ratio:    [riesgo-ajustado]
Max Drawdown:    [caída máxima]
Return:          [retorno %]
Profit/Loss:     [ganancias o pérdidas en $]
```

### En los Logs:
1. **Menu → View → Log** (o presiona **Ctrl+L**)
2. Se abre una ventana con el archivo de log
3. Lee las estadísticas completas

---

## ✅ PASO 7: GUARDAR RESULTADOS

### Opción A: Guardar el Log como Texto
1. **Menu → File → Save Log As...**
2. Elige ubicación: `E:\PROYECTOS\CURSOR\PROYECTO 1 ZORRO\backtest_results\`
3. Nombre: `STRATEGY_1_1_133_RESULTS_[DATE].txt`
4. Click Save

### Opción B: Guardar el gráfico
1. **Menu → File → Save Chart As...**
2. Nombre: `STRATEGY_1_1_133_CHART_[DATE].png`
3. Click Save

### Opción C: Copiar resultados manualmente
1. Selecciona el texto del log (Ctrl+A en la ventana Log)
2. Copia (Ctrl+C)
3. Abre Notepad
4. Pega (Ctrl+V)
5. Guarda como `STRATEGY_1_1_133_RESULTS_[DATE].txt`

**✓ Confirmación**: Archivos guardados en la carpeta de resultados

---

## 📊 MÉTRICAS A BUSCAR

### Señales de un BUEN backtest:
✅ **Win Rate**: > 40%  
✅ **Profit Factor**: > 1.5  
✅ **Sharpe Ratio**: > 0.5  
✅ **Max Drawdown**: < 25%  
✅ **Return**: > 5% annual  

### Señales de un MALO backtest:
❌ **Win Rate**: < 30%  
❌ **Profit Factor**: < 1.0 (más pérdidas que ganancias)  
❌ **Sharpe Ratio**: < 0.2  
❌ **Max Drawdown**: > 40%  

---

## 🆘 TROUBLESHOOTING

### Problema 1: "Asset ES not found"
**Solución**:
- ZORRO necesita datos históricos de ES
- Descarga desde: `Menu → Tools → Download → ES`
- O usa un asset alternativo: "NQ" (Nasdaq), "GC" (Gold)

### Problema 2: "Insufficient lookback"
**Solución**:
- Aumenta el lookback: Cambia `LookBack = 280;` en el código
- Recompila y reinicia backtest

### Problema 3: "No trades generated"
**Solución**:
- Verifica que el asset tiene datos en el rango de fechas
- Revisa las condiciones de entrada en el código
- Aumenta el período: `BarPeriod = 60;` (60 minutos)

### Problema 4: ZORRO se congela o no responde
**Solución**:
- Cierra ZORRO completamente (Alt+F4)
- Abre nuevamente
- Intenta con un período más corto: StartDate = 20250101

---

## 📝 PRÓXIMOS PASOS (después del backtest)

Una vez tengas los resultados:

1. **Comparte los resultados conmigo**:
   - Captura de pantalla del gráfico
   - Archivo de log (.txt)
   - O solo cuéntame los números principales

2. **Ejecutaremos**:
   - Montecarlo Validation (200 simulations)
   - Walk Forward Analysis (WFA)
   - Parameter Optimization
   - Robustness Testing

3. **Crearemos**:
   - Reporte profesional con todos los resultados
   - Recomendaciones de mejora
   - Plan para la siguiente iteración

---

## ✅ CHECKLIST ANTES DE EMPEZAR

- [ ] ZORRO.exe descargado en D:\ZORRO\
- [ ] Archivo `STRATEGY_1_1_133_CORRECTED.c` en D:\ZORRO\Strategy\
- [ ] Datos históricos de ES descargados (mínimo 2020-2026)
- [ ] Tienes 30-60 minutos disponibles (backtest + análisis)
- [ ] Sin programas pesados corriendo (libera RAM)
- [ ] Conexión a internet estable (si ZORRO descarga datos en vivo)

---

**¡Adelante! Abre ZORRO y ejecuta el backtest. Cuando termines, cuéntame los resultados.** 🚀

Si tienes alguna duda o problema, escríbeme con:
- Número de paso donde te quedaste
- Captura de pantalla del error
- Mensaje de error exacto que viste
