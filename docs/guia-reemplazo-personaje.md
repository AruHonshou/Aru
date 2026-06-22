# Guia De Creacion De Aru

Esta guia describe el flujo actual para crear o reemplazar los frames de Aru usando las hojas fuente de `imagenes/`.

## Hojas Necesarias

Coloca seis PNG cuadrados en `imagenes/`:

| Hoja | Ojos | Boca | Nombre actual |
| --- | --- | --- | --- |
| A | abiertos | cerrada | `A_OjosAbiertos_BocaCerrada.png` |
| B | abiertos | semiabierta | `B_OjosAbiertos_BocaMedia.png` |
| C | abiertos | abierta | `C_OjosAbiertos_BocaAbierta.png` |
| D | cerrados | cerrada | `D_OjosCerrados_BocaCerrada.png` |
| E | cerrados | semiabierta | `E_OjosCerrados_BocaMedia.png` |
| F | cerrados | abierta | `F_OjosCerrados_BocaAbierta.png` |

El generador acepta cualquier archivo PNG que empiece por `A_`, `B_`, `C_`, `D_`, `E_` o `F_`.

## Requisitos De Imagen

- Cada hoja debe ser cuadrada.
- Cada hoja debe contener una grilla visual de 5 columnas por 5 filas.
- Las seis hojas deben mantener el mismo tamano, posicion y escala del personaje.
- El fondo debe ser uniforme y coincidir con `#FFEAD3`.

## Generacion

Ejecuta:

```bash
npm run generate:character
```

El script:

- Lee las seis hojas desde `imagenes/`.
- Divide cada hoja en 25 celdas proporcionales.
- Redimensiona cada celda a `1200x1200`.
- Limpia fragmentos de celdas vecinas usando el fondo `#FFEAD3`.
- Genera WebP optimizados en `public/slices2/`.

Salida esperada:

```text
public/slices2/
  A/r0c0.webp ... r4c4.webp
  B/r0c0.webp ... r4c4.webp
  C/r0c0.webp ... r4c4.webp
  D/r0c0.webp ... r4c4.webp
  E/r0c0.webp ... r4c4.webp
  F/r0c0.webp ... r4c4.webp
```

Total: 150 frames.

## Verificacion

Comprueba que cada carpeta tenga 25 archivos:

```powershell
Get-ChildItem public\slices2 -Directory | ForEach-Object {
  "$($_.Name) $((Get-ChildItem $_.FullName -Filter *.webp).Count)"
}
```

Revisa visualmente al menos:

```text
public/slices2/A/r0c0.webp
public/slices2/A/r2c2.webp
public/slices2/A/r4c4.webp
public/slices2/F/r0c0.webp
public/slices2/F/r2c2.webp
public/slices2/F/r4c4.webp
```

Busca:

- Que no aparezcan fragmentos de otra celda.
- Que cabello y accesorios no queden cortados de forma brusca.
- Que A-F no salten de posicion.
- Que el fondo se mezcle con la pagina.

## Prueba En La App

```bash
npm run dev
```

Abre:

```text
http://localhost:5173/index.html
http://localhost:5173/guia.html
```

Verifica:

- Aru sigue el mouse.
- La boca cambia con audio.
- El parpadeo usa los estados de ojos cerrados.
- No hay errores en consola.
