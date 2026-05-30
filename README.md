# Prueba Tecnica de SCM

#### Sábado 30 de mayo:

Hora de comenzamiento: 09:00

Hora de entrega: tbc

## Ejercicio 1:

- Implementado contrato de filtros 
- - El usuario debe de mandar el siguiente payload:
```JSON
{
  "filters": [
    {
      "field": "status",
      "operator": "eq",
      "value": "disponible"
    }
  ]
}
```
Tambien es posible mandar varios filtros en el payload:
```JSON
{
  "filters": [
    {
      "field": "status",
      "operator": "eq",
      "value": "disponible"
    },
    {
      "field": "warehouse_id",
      "operator": "eq",
      "value": "1"
    }
  ]
}
```
- Restringido operadores permitidos a:
    - "eq", "neq", "gt", "gte", "lt", "lte", "like", "in", "is_null"

- Implementado funcionalidad para que los filtros sean seguro y limite la cantidad de resultados.