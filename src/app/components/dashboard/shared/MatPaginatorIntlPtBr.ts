import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";

@Injectable()
export class MatPaginatorIntlPtBr extends MatPaginatorIntl{
    override itemsPerPageLabel = 'Itens por página';
    override nextPageLabel = 'Próxima página';
    override previousPageLabel = 'Página anterior';
    override firstPageLabel = 'Primeira página';
    override lastPageLabel = 'Última página';

    // Método para atualizar os textos se necessário
    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0) {
            return `0 de ${length}`;
        }
        const startIndex = page * pageSize + 1;
        const endIndex = Math.min(startIndex + pageSize - 1, length);
        return `${startIndex} - ${endIndex} de ${length}`;
    };
}
