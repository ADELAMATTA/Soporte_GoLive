# ALTIM - Sistema de Gestión de Incidencias

## Descripción
Aplicación web moderna para la gestión de incidencias UAT con autenticación basada en roles, integración con IA (Google Gemini), notificaciones por email, y dashboard estadístico.

## Características Principales

### ✅ Autenticación y Roles
- 5 roles de usuario: Administrador, Consultor, Cliente, Jefe de Proyecto, Responsable de Área
- Credenciales por defecto: `admin@altim.com` / `admin123`
- Cada usuario asociado a un cliente específico

### ✅ Gestión de Clientes (Solo Administrador)
- Maestro de clientes con nombre, abreviatura (3 caracteres), email y teléfono
- Numeración automática de incidencias por cliente (ej: ALT0000001)

### ✅ Gestión de Usuarios (Administrador y Jefe de Proyecto)
- Registro de nuevos usuarios
- Asignación de rol y cliente
- Abreviatura de cliente auto-asignada

### ✅ Sistema de Incidencias
- **18 columnas** según especificaciones
- **Permisos por rol**:
  - Solo Cliente, Jefe Proyecto y Administrador pueden crear incidencias
  - Usuario Cliente: campos auto-rellenados, campos obligatorios específicos, campos bloqueados
  - Campos 1,2,3,4,5,7,10,12 solo modificables por Admin/Jefe tras creación
- **Codificación por colores**:
  - 🟢 Cerrada → Verde
  - 🟠 Entregada → Naranja claro
  - ⚪ Pendiente cliente →  Gris claro
  - 🔴 Descartada → Rojo
- **Filtrado automático** por cliente del usuario
- Búsqueda y ordenamiento

### ✅ Integración con Google Gemini AI
- Generación automática de soluciones basadas en descripción y observaciones
- Resultados en campo 17 (COMENTARIOS FINALES CONSULTOR)
- Análisis inteligente de incidencias SAP

### ✅ Notificaciones por Email
- Email automático al asignar Responsable Altim
- Asunto: `[Nº incidencia] - [TIPO]`
- Cuerpo: Descripción completa + Soluciones IA

### ✅ Dashboard de Estadísticas
- KPIs: Total, Cerradas, Abiertas, Tiempo Promedio
- Gráficos por Estado, Prioridad, Tipo, LoB
- Selector de cliente (Admin/Jefe/Consultor)

### ✅ Multiidioma (i18n)
- Español (por defecto)
- English
- Selector en header, preferencia guardada en localStorage

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para librerías CDN)
- API Keys (opcional, para funciones avanzadas):
  - Google Gemini API Key
  - EmailJS configuración

## Instalación

1. Todos los archivos ya están en: `c:\Proyecto Incidencias\`
   - `index.html` - Aplicación principal
   - `styles.css` - Estilos
   - `app.js` - Lógica de aplicación
   - `logo.png` - Logo de ALTIM

2. No se requiere instalación de dependencias (usa CDNs)

## Configuración (Opcional)

### Google Gemini API
Para habilitar las sugerencias de IA:

1. Obtener API Key en: https://ai.google.dev/
2. Abrir `app.js`
3. Modificar línea 12:
```javascript
const CONFIG = {
    GEMINI_API_KEY: 'TU_API_KEY_AQUI',
    ...
};
```

### EmailJS
Para habilitar notificaciones por email:

1. Crear cuenta en: https://www.emailjs.com/
2. Configurar servicio y plantilla
3. Abrir `app.js`
4. Modificar líneas 13-15:
```javascript
const CONFIG = {
    ...
    EMAILJS_SERVICE_ID: 'TU_SERVICE_ID',
    EMAILJS_TEMPLATE_ID: 'TU_TEMPLATE_ID',
    EMAILJS_PUBLIC_KEY: 'TU_PUBLIC_KEY'
};
```

**Plantilla de Email sugerida:**
```
Asunto: {{incident_number}} - {{incident_type}}

Descripción:
{{description}}

Observaciones:
{{observations}}

------------------
Detalles:
- Cliente: {{client}}
- Prioridad: {{priority}}
- Sistema: {{system}}

------------------
Soluciones Sugeridas:
{{solutions}}
```

## Uso

### Inicio Rápido

1. Abrir el archivo `index.html` en tu navegador web
2. Iniciar sesión con credenciales de administrador:
   - Email: `admin@altim.com`
   - Contraseña: `admin123`

### Flujo de Trabajo

1. **Administrador**:
   - Gestionar clientes (añadir clientes con abreviaturas)
   - Gestionar usuarios (crear usuarios y asignarles clientes)

2. **Usuario Cliente**:
   - Crear incidencias (campos específicos obligatorios)
   - Ver solo incidencias de su cliente

3. **Jefe de Proyecto/Consultor/Administrador**:
   - Ver todas las incidencias
   - Asignar Responsable Altim
   - Modificar cualquier campo
   - Ver estadísticas de todos los clientes

### Validaciones de Campos

**Dropdowns con valores predefinidos:**
- Prioridad: Alta, Baja, Sin prioridad, Crítica, Media
- TIPO: Consulta, Duda, Evolutivo, Formación, Gestión, Incidencia, Petición, Preventiva, Proyecto
- Sistema: S/4Hana CP, S/4Hana Rise, S/4Hana OP, Data Warehouse, CRM, SAC, Integration Suite, SAP BTP, Build
- Estado: 01-12 (diferentes estados con códigos)
- LoB: 14 líneas de negocio diferentes

**Responsable Altim (dinámico):**
- Solo muestra usuarios con rol: Consultor, Jefe de Proyecto o Administrador

## Estructura de Datos

La aplicación usa almacenamiento en memoria (client-side). Los datos se pierden al recargar la página.

**Para producción, se recomienda:**
- Backend con base de datos (PostgreSQL, MySQL, MongoDB)
- Sistema de autenticación seguro (JWT, OAuth)
- API REST para operaciones CRUD
- Persistencia de datos

## Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos moderno con variables CSS
- **JavaScript (Vanilla)** - Lógica de aplicación
- **Chart.js** - Gráficos estadísticos
- **EmailJS** - Envío de emails
- **Google Gemini API** - IA generativa
- **Google Fonts** - Tipografía Inter

## Notas Importantes

⚠️ **Seguridad**: Esta es una aplicación client-side NO apta para producción. Datos y contraseñas se almacenan en memoria sin encriptación.

⚠️ **APIs**: Las integraciones de Gemini y EmailJS requieren configuración manual de API Keys.

⚠️ **Datos**: Los datos no persisten entre sesiones. Implementar backend para producción.

## Solución de Problemas

### La aplicación no carga
- Verificar que todos los archivos (.html, .css, .js, .png) estén en la misma carpeta
- Abrir la consola del navegador (F12) para ver errores
- Verificar conexión a internet (para CDNs)

### No funciona la IA
- Verificar que GEMINI_API_KEY esté configurado en app.js
- Revisar consola del navegador para errores de API
- Confirmar que la API Key sea válida

### No se envían emails
- Verificar configuración de EmailJS en app.js
- Confirmar cuenta y template en EmailJS
- Revisar límite de emails gratuitos (200/mes)

### No aparecen las traducciones
- Cambiar idioma usando los botones ES/EN en el header
- Limpiar caché del navegador
- Verificar que translations esté cargado en app.js

## Soporte

Para preguntas o problemas, contactar a soporte técnico de ALTIM.

## Licencia

© 2026 ALTIM Consulting. Todos los derechos reservados.
