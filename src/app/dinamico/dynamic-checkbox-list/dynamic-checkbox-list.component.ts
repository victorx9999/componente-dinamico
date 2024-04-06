import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


export interface Item {
  codigo: number;
  nome: string;
}
@Component({
  selector: 'app-dynamic-checkbox-list',
  templateUrl: './dynamic-checkbox-list.component.html',
  styleUrls: ['./dynamic-checkbox-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCheckboxListComponent implements OnInit {
  @Input() itemsCarregados: Item[] = [];
  @Input() itensPorPagina: number = 0;

  @Output() objetosSelecionadosChange = new EventEmitter<Item[]>();
  @Output() filtroAtualizado = new EventEmitter<string>();


  termoDeBuscaControl = new FormControl('');
  listaFiltrada: Item[] = [];
  paginaAtual = 1;
  objetosSelecionados: Item[] = [];
  prefixoId: string = '';

  ngOnInit(): void {
    this.termoDeBuscaControl.valueChanges.subscribe(() => {
      this.filtrarLista();
    });
    this.atualizarListaFiltrada();
    this.prefixoId = 'lista_' + this.itemsCarregados.length.toString();

  }

  filtrarLista() {
    this.paginaAtual = 1;
    this.atualizarListaFiltrada();
    this.filtroAtualizado.emit(this.termoDeBuscaControl.value!);
  }

  atualizarListaFiltrada() {
    const termo = this.termoDeBuscaControl.value?.toLowerCase();
    this.listaFiltrada = this.filtrarPorNome(termo!);
  }

  filtrarPorNome(termoLowerCase: string | null): Item[] {
    return this.itemsCarregados.filter(objeto => {
      if (!termoLowerCase) {
        return true;
      }
      return objeto.codigo.toString().includes(termoLowerCase) ||
        (objeto.nome && objeto.nome.toLocaleLowerCase().includes(termoLowerCase));
    });
  }

  toggleSelecao(objeto: Item) {
    const index = this.objetosSelecionados.findIndex(item => item.codigo === objeto.codigo);
    if (index === -1) {
      this.objetosSelecionados.push(objeto);
    } else {
      this.objetosSelecionados.splice(index, 1);
    }
    this.objetosSelecionadosChange.emit(this.objetosSelecionados);
  }

  isSelecionado(objeto: Item): boolean {
    return this.objetosSelecionados.some(item => item.codigo === objeto.codigo);
  }

  verMais() {
    this.paginaAtual++;
    this.atualizarListaFiltrada();
  }
  trackByCodigo(index: number, item: Item): number {
    return item.codigo;
  }

}

