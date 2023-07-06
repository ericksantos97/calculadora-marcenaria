import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  nome: string;
  cpf: string;
  codigoCarteira: string;
  nomeCarteira: string;
  data: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora-marcenaria';

  myControl = new FormControl('');
  private tableHeader: User = {
    nome: 'Nome do Cliente',
    cpf: 'CPF/CNPJ',
    codigoCarteira: 'Código da Carteira',
    nomeCarteira: 'Nome da Carteira',
    data: 'Data'
  };

  options: User[] = [
    { nome: 'Carlos1 Teste Nome Muito Grande', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos2', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos3', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos4', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos5', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos6', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos7', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos8', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos9', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos10', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos11', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos12', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
    { nome: 'Carlos13', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
  ];
  filteredOptions!: Observable<User[]>;
  filteredOptionsLength: number = 0;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        let inputValue = '';

        if (value) { inputValue = (typeof value === 'string') ? value : value['nome']; }

        if (inputValue && inputValue.length >= 3) {
          const filterValue = inputValue.toLowerCase();
          let filteredItems = this.options.filter((option: User) =>
            option.nome.toLowerCase().includes(filterValue)
          );
          filteredItems.unshift(this.tableHeader);

          this.filteredOptionsLength = filteredItems.length;

          return filteredItems.slice(0, 11).map((item, index) => ({
            ...item,
            isLastOption: index === filteredItems.length - 1
          }));
        } else {
          this.filteredOptionsLength = 0;
          return [];
        }
      })
    );
  }

  displayFn(user: User): string {
    return user && user.nome ? user.nome : '';
  }
}
