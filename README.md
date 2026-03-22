# Prep AI - Proyecto de Adherencia PrEP (v1.0)

Este es un asistente inteligente diseñado para mejorar la adherencia al tratamiento PrEP, optimizado para el contexto de salud en Colombia.

## Estado Actual: Versión de Estabilidad (Hito de Seguridad)
Ante el anuncio del cierre de Firebase Studio en 2027, este proyecto ha sido consolidado para garantizar su portabilidad absoluta mediante Git.

- **Contexto Nacional (Colombia):** Gestión de citas basada en Documento de Identidad Original.
- **Estabilidad de Interfaz:** Calendario optimizado y carga segura (No-SSR) para evitar errores de hidratación.
- **Preparación de Datos:** Esquema definido en `docs/backend.json` listo para migrar a Firestore real.

## Guía de Migración con Git (Recomendada)

1. **Descarga:** Obtén el archivo Zip de este proyecto.
2. **Inicializa Git localmente (en tu MacBook):**
   ```bash
   git init
   git add .
   git commit -m "v1.0: Versión de estabilidad y preparación para migración"
   ```
3. **Sube a GitHub:** Crea un repositorio en GitHub y sigue las instrucciones para vincularlo:
   ```bash
   git remote add origin <tu-url-de-github>
   git branch -M main
   git push -u origin main
   ```
4. **Importa en Project IDX:** Ve a [idx.google.com](https://idx.google.com) e importa directamente desde tu repositorio de GitHub.

## Alternativa: Google AI Studio
Para razonamiento puro con IA, sube la carpeta `src` y `docs/backend.json` a [aistudio.google.com](https://aistudio.google.com) para que Gemini conozca toda tu lógica actual.

---
*Desarrollado para un futuro de salud más conectado y seguro.*