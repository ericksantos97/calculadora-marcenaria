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
  options: User[] = [
    { nome: 'Carlos1', cpf: '45612378903', codigoCarteira: '003', nomeCarteira: 'Carteira 3', data: '10/03/2023' },
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

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        let inputValue = '';

        if (value) { inputValue = (typeof value === 'string') ? value : value['nome']; }

        if (inputValue && inputValue.length >= 3) {
          const filterValue = inputValue.toLowerCase();
          const filteredItems = this.options.filter((option: User) =>
            option.nome.toLowerCase().includes(filterValue)
          );
          return filteredItems.slice(0, 10).map((item, index) => ({
            ...item,
            isLastOption: index === filteredItems.length - 1
          }));
        } else {
          return [];
        }
      })
    );
  }

  displayFn(user: User): string {
    return user && user.nome ? user.nome : '';
  }
}
