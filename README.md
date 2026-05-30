# Prueba Tecnica de SCM

#### Sábado 30 de mayo:

Hora de comenzamiento: 09:00

Hora de entrega: 13:15

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

## Ejercicio 2:

El frontend está construido con ReactJS, ya que es la tecnología con la que tengo más confianza actualmente.

- No me da tiempo de implementar el sistema de refresh token.
- Hay fallos graves de seguridad relacionados con el manejo de los access y refresh tokens en el frontend.
- Se ha utilizado Bootstrap v5 para los estilos.

## Ejercicio 3:

Adjunto el email en un PDF al email de submission.