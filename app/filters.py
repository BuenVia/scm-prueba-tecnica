from sqlalchemy import Select
from fastapi import HTTPException

from app.models import Item

MAX_LIMIT = 3

def apply_filters(stmt: Select, filters: str | None) -> Select:
       # Si filtro es una lista vacia, limita numero de resultados
    if not filters:
        return stmt.limit(MAX_LIMIT)
    
    # Whitelist de columnas
    allowed_fields = {
        column.name: getattr(Item, column.name) for column in Item.__table__.columns
    }

    # Dirigir los filtros
    for filter_item in filters:
        field_name = filter_item.field
        operator = filter_item.operator
        value = filter_item.value

        column = allowed_fields.get(field_name)

        # Asegura que el field_name existe en los allowed_fields
        if column is None:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid field: {field_name}",
            )

        # Comparison de los operators
        if operator == "eq":
            stmt = stmt.where(column == value)

        elif operator == "neq":
            stmt = stmt.where(column != value)

        elif operator == "gt":
            stmt = stmt.where(column > value)

        elif operator == "lt":
            stmt = stmt.where(column < value)

        elif operator == "gte":
            stmt = stmt.where(column >= value)

        elif operator == "lte":
            stmt = stmt.where(column <= value)

        elif operator == "like":
            if not isinstance(value, str):
                raise HTTPException(
                    status_code=400,
                    detail="LIKE operator requires string value",
                )

            stmt = stmt.where(column.like(value))

        elif operator == "in":
            if not isinstance(value, list):
                raise HTTPException(
                    status_code=400,
                    detail="IN operator requires a list",
                )

            if len(value) > 50:
                raise HTTPException(
                    status_code=400,
                    detail="IN operator supports maximum 50 values",
                )

            stmt = stmt.where(column.in_(value))

        elif operator == "is_null":
            stmt = stmt.where(column.is_(None))

        # Si el operador no existe
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid operator: {operator}",
            )
        
    return stmt.limit(MAX_LIMIT)

