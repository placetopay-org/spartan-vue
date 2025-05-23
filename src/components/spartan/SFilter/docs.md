# SFilter Docs

## Descripción General
El componente SFilter es un componente versátil diseñado para manejar filtros en una interfaz de usuario. Permite a los usuarios gestionar y aplicar filtros de manera dinámica.

## Términos y Conceptos

### Campos y Filtros
- **Campo (Field)**: Es un atributo o columna de datos sobre el cual se puede aplicar una condición. Representa la categoría o característica que deseas utilizar para filtrar información. Los campos definen qué se puede filtrar, no cómo se filtra.
  - Ejemplo: En una tabla de productos, los campos pueden ser "Precio", "Categoría", "Fecha de creación", "Marca".

- **Filtro (Filter)**: Es una condición o regla específica aplicada a uno o más campos para restringir los resultados. Un filtro se compone de:
  - Un campo (ej: "Precio")
  - Un operador (ej: "mayor que", "igual a")
  - Un valor (ej: "$100")

### Tipos de Filtros
- **Filtro Simple**: Usa un solo campo para aplicar una condición.
  - Ejemplo: "Categoría = Electrónicos"
  - Característica: Aplica una única condición sobre un campo.

- **Filtro Compuesto**: Combina múltiples campos o condiciones con operadores lógicos (AND/OR).
  - Ejemplo: "Precio < $500 Y Marca = Samsung"
  - Característica: Las condiciones están lógicamente vinculadas.


## Estructura de un Campo
Un campo (Field) es la unidad básica de configuración en el componente SFilter. Cada campo tiene la siguiente estructura:

```json
{
    "id": "price",
    "name": "Precio",
    "permanent": false,
    "interfaces": {
        "oneInput": {
            "type": "amount",
            "currency": "USD",
            "operators": [
                "equals",
                "greaterThan",
                "lessThan"
            ]
        },
        "twoInputs": {
            "type": "date",
            "operators": [
                "between",
                "notBetween"
            ]
        },
        "options": {
            "options": [
                { "id": "active", "label": "Activo" },
                { "id": "inactive", "label": "Inactivo" }
            ],
            "multiple": true,
            "operators": [
                "equals",
                "in",
                "notIn"
            ]
        }
    },
    "state": {
        "operator": "greaterThan",
        "value": 100
    }
}
```

### Propiedades del Campo

#### Propiedades Básicas
- `id`: Identificador único del campo. Debe ser único en el conjunto de campos.
- `name`: Nombre legible que se muestra al usuario en la interfaz.
- `permanent`: Booleano que indica si el filtro es permanente. Los filtros permanentes no pueden ser eliminados ni limpiados.

#### Propiedad interfaces
Define las diferentes formas en que se puede configurar el campo. Un campo puede tener múltiples interfaces disponibles.

##### Tipos de Interfaces

1. **oneInput:**
   Interfaz para campos que requieren un solo valor de entrada. Ideal para campos numéricos, fechas individuales, montos con moneda y campos de texto como nombres, descripciones o cualquier valor alfanumérico.

   - `type`: Se usa solo cuando se necesita especificar que el input es para números, fechas o montos. Si no se especifica, se considera un campo de texto por defecto.
   - `currency`: Moneda para campos de tipo amount

   ```json
   {
       "oneInput": {
           "type": "amount",
           "currency": "USD",
           "operators": [
               "equals",
               "greaterThan",
               "lessThan",
               {
                   "id": "customAmount",
                   "label": "Monto Específico",
                   "tag": "Monto: ${{value}}"
               }
           ]
       }
   }
   ```

   ```json
   {
       "oneInput": {
           "operators": [
               "equals",
               "contains",
               "startsWith",
               "endsWith",
               {
                   "id": "customText",
                   "label": "Texto Específico",
                   "tag": "Contiene: {{value}}"
               }
           ]
       }
   }
   ```

2. **twoInputs:**
   Interfaz para campos que requieren un rango de valores. Ideal para rangos de fechas, precios y períodos de tiempo.

   - `type`: Tipo de dato para rangos (ej: fechas)

   ```json
   {
       "twoInputs": {
           "type": "date",
           "operators": ["between", "notBetween"]
       }
   }
   ```

3. **options:**
   Interfaz para campos con opciones predefinidas. Ideal para estados, categorías, tipos de documento y campos con valores fijos.

   - `options`: Lista de opciones predefinidas con id y label
   - `multiple`: Permite selección múltiple de opciones

   ```json
   {
       "options": {
           "options": [
               { "id": "active", "label": "Activo" },
               { "id": "inactive", "label": "Inactivo" }
           ],
           "multiple": true,
           "operators": ["equals", "in", "notIn"]
       }
   }
   ```

4. **selection:**
   Interfaz para campos que requieren selección de valores mediante tags. Similar a options pero permite al usuario ingresar sus propias opciones. Ideal para etiquetas, categorías dinámicas, palabras clave o cualquier campo donde el usuario necesite definir sus propios valores.

   ```json
   {
       "selection": {
           "operators": ["equals", "notEquals"]
       }
   }
   ```

   En este ejemplo, el usuario puede ingresar múltiples tags como "urgente", "revisión", "alta prioridad", etc.

##### Propiedades Comunes
- `operators`: Array de operadores disponibles para cada interfaz. Cada operador puede ser:
  - Un string con el ID de un operador predefinido (ej: "equals", "contains", "greaterThan")
  - Un objeto personalizado con:
    - `id`: Identificador único del operador
    - `label`: Texto que se mostrará en el badge
    - `tag`: Texto o función que se mostrará en el badge según el valor del filtro

#### Propiedad state
Contiene la configuración actual del filtro cuando está activo:
- `operator`: Operador seleccionado para el filtro
- `value`: Valor configurado para el filtro

### Ejemplo de Uso

```json
{
    "id": "status",
    "name": "Estado",
    "permanent": false,
    "interfaces": {
        "options": {
            "options": [
                { "id": "pending", "label": "Pendiente" },
                { "id": "approved", "label": "Aprobado" },
                { "id": "rejected", "label": "Rechazado" }
            ],
            "multiple": true,
            "operators": ["equals", "in", "notIn"]
        }
    },
    "state": {
        "operator": "in",
        "value": ["pending", "approved"]
    }
}
```

En este ejemplo:
- El campo "Estado" permite seleccionar múltiples estados
- El filtro está activo y muestra elementos con estado "Pendiente" o "Aprobado"
- No es un filtro permanente, por lo que puede ser eliminado

## Estructura del Componente

### Archivos Principales
- `SFilter.vue`: Componente principal
- `context.ts`: Manejo del contexto y estado
- `types.ts`: Definiciones de tipos
- `helpers.ts`: Funciones auxiliares
- `constants.ts`: Constantes del componente

### Componentes Hijos
- `FieldBadge.vue`: Representa visualmente un campo de filtro activo en forma de badge. Al hacer clic en él, muestra la interfaz de configuración específica para ese campo, permitiendo al usuario modificar sus propiedades y valores.
- `SavedButton.vue`: Botón que permite guardar la configuración actual de los filtros. Al hacer clic, muestra un diálogo donde el usuario puede asignar un nombre al conjunto de filtros y guardarlo. Los filtros guardados pueden ser recuperados posteriormente para su reutilización. Este botón solo se muestra cuando hay filtros activos y la prop `saved` es verdadera.
- `AddFilterButton.vue`: Botón que permite agregar un nuevo campo de filtro. Al hacer clic, muestra un menú desplegable con todos los campos disponibles que aún no han sido agregados como filtros. El usuario puede seleccionar un campo para agregarlo al filtro. Una vez agregado, el campo se mostrará como un FieldBadge y podrá ser configurado individualmente.

## Funcionalidades Principales

### 1. Gestión de Filtros
- Permite crear y gestionar múltiples filtros
- Cada filtro puede tener un estado y propiedades específicas
- Soporta filtros permanentes y temporales

### 2. Aplicación de Filtros
```typescript
const apply = () => {
    const fields: Omit<TField, 'interfaces'>[] = [];
    props.fields?.forEach((field) => {
        if (field.state) {
            const { interfaces, ...rest } = field;
            fields.push({ ...rest });
        }
    });
    emit('apply', fields);
};
```
- Recopila todos los filtros activos
- Emite un evento con los campos filtrados
- Excluye los campos sin estado

### 3. Limpieza de Filtros
```typescript
const clear = () => {
    props.fields?.forEach((filter) => {
        if (filter.permanent) return;
        delete filter.state;
    });
};
```
- Elimina el estado de todos los filtros no permanentes
- Mantiene los filtros marcados como permanentes

### 4. Aplicación Inmediata
```typescript
onMounted(() => {
    if (props.immediateApply) apply();
});
```
- Permite aplicar filtros automáticamente al montar el componente
- Controlado por la prop `immediateApply`

## Props y Emits

### Props Principales
- `fields`: Array de campos filtrables
- `responsive`: Controla el comportamiento responsivo (default: true)
- `immediateApply`: Activa la aplicación automática de filtros
- `hideApplyButton`: Oculta el botón de aplicar
- `hideClearButton`: Oculta el botón de limpiar
- `saved`: Indica si hay filtros guardados

### Emits
- `apply`: Emitido cuando se aplican los filtros
- Otros eventos específicos definidos en `TFilterEmits`

## Interfaz de Usuario

### Estructura del Template
```vue
<div class="flex gap-3 justify-between">
    <!-- Sección de badges de campos -->
    <div class="flex w-full flex-wrap gap-3">
        <FieldBadge v-for="field in context.activeFields" :key="field.id" :field="field" />
        <AddFilterButton />
    </div>

    <!-- Sección de botones de acción -->
    <div class="flex gap-3" v-if="!hideApplyButton && !hideClearButton">
        <SavedButton v-if="saved" />
        <SButton v-if="!hideApplyButton" @click="apply">
            {{ t('applyBtn') }}
        </SButton>
        <SButton v-if="!hideClearButton" @click="clear">
            {{ t('clearBtn') }}
        </SButton>
    </div>
</div>
```
</div>
</div> 