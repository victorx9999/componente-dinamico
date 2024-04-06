import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularDinamico';
  listaObjetoDinamica: any[] = [];
  listaObjetoEmpresa: any[] = [];
  objetosSelecionadosControl = new FormControl([]);

  FiltroSelecionados: any = {
    dinamica: [],
    empresa: []
  };

  ngOnInit(): void {
    this.gerarListaObjetosDinamica();
    this.gerarListaObjetosEmpresa();
  }

  gerarListaObjetosDinamica() {
    for (let i = 1; i <= 8000; i++) {
      const objeto = {
        codigo: i,
        nome: 'Dinamica ' + i
      };
      this.listaObjetoDinamica.push(objeto);
    }
    console.log(this.listaObjetoDinamica)
  }

  gerarListaObjetosEmpresa() {
    for (let i = 1; i <= 2000; i++) {
      const objeto = {
        codigo: i,
        nome: 'Empresa ' + i
      };
      this.listaObjetoEmpresa.push(objeto);
    }
    console.log(this.listaObjetoEmpresa)
  }

  onObjetosSelecionadosChange(objetosSelecionados: any, tipo: string) {
    this.FiltroSelecionados[tipo] = objetosSelecionados;
    console.log('Objetos selecionados:', this.FiltroSelecionados);
  }

  enviarCodigosSelecionadosParaBackend() {
    const codigosDinamica = this.FiltroSelecionados.dinamica.map((objeto: any) => objeto.codigo).join(",");
    const codigosEmpresa = this.FiltroSelecionados.empresa.map((objeto: any) => objeto.codigo).join(",");
    const codigosEmpresa2 = this.FiltroSelecionados.empresa.map((objeto: any) => objeto.nome).join(",");

    console.log('Códigos dinâmica:', this.FiltroSelecionados);
  }

}
