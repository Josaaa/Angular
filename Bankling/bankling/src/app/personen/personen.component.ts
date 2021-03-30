import { Component, OnInit } from '@angular/core';
import {Persoon} from '../persoon';
import {PERSONEN} from '../mock-personen';
import {PersoonService} from '../persoon.service'; 
import { textChangeRangeIsUnchanged } from 'typescript';


@Component({
  selector: 'app-personen',
  templateUrl: './personen.component.html',
  styleUrls: ['./personen.component.css']
})
export class PersonenComponent implements OnInit {  
  personen!: Persoon[]
  totaal : number = 0; 
  resultaat : string = ''; 
  personenMetLening : Persoon[] = [];
  amount : number = 0; 


  constructor(private persoonService : PersoonService) { }

  ngOnInit(): void {
    this.getPersonen(); 
  }

  getPersonen(): void {
    this.persoonService.getPersonen().subscribe(personen => this.personen = personen);
  }

  add(naam: string, bedragn: string): void {
    naam = naam.trim();
    bedragn = bedragn.trim(); 
    var betalen : number = 0; 
    var bedrag : number = +bedragn; 
    if (!naam) { return; }
    this.persoonService.addPersoon({ naam, bedrag, betalen } as Persoon)
      .subscribe(persoon => {
        this.personen.push(persoon);
      });
  }

  delete(persoon: Persoon): void {
    this.personen = this.personen.filter(p => p !== persoon);
    this.persoonService.deletePersoon(persoon.id).subscribe();
  }

  vereken(): void{
    this.totaal = 0; 
    this.resultaat = '';
    for (let i = 0; i < this.personen.length ; i++){
      this.totaal += this.personen[i].bedrag; 
    }
    this.totaal = this.totaal / this.personen.length; 
    for (let i =0; i< this.personen.length; i++)
    {
      this.personen[i].betalen = 0;
    }
    for (let i =0; i< this.personen.length; i++)
    {
      var bedrag = this.personen[i].bedrag; 
      if ( bedrag !== this.totaal)
      {
        this.personen[i].betalen = this.totaal - bedrag;
        this.personenMetLening[i] = this.personen[i];
      }
    }
    this.geldUitwissel(this.personenMetLening[0], 0 ,0, 0)
    console.log(this.resultaat);
  }

  geldUitwissel(persoon : Persoon,  count : number, nietGelijk : number, v : number) 
  {
    if(persoon === undefined &&  this.personenMetLening.length === 0) return;
    else if (persoon === undefined) {
      persoon = this.personenMetLening[0];
      count = 0
    }
    if(persoon.betalen < 0) this.geldUitwissel(this.personenMetLening[count + 1], count + 1, 0, 0)
    console.log(count + " : " + this.personenMetLening.length);
    for(let i = 0; i < this.personenMetLening.length; i++)
      {
        if(nietGelijk == 0){
          if(i == this.personenMetLening.length - 1)
              {
                this.geldUitwissel(persoon, count, 1, 0);
                return;
                
              }
          else if(Math.abs(persoon.betalen) === Math.abs(this.personenMetLening[i].betalen) && count !== i)
              {
                this.resultaat += persoon.naam + " moet " + persoon.betalen + " euro geven aan " + this.personenMetLening[i].naam, + "\n";
                this.personenMetLening.splice(count, 1);
                this.personenMetLening.splice(i, 1);
                if(this.personenMetLening.length === 0 || this.personenMetLening.length === 1) return; 
                this.geldUitwissel(this.personenMetLening[0], 0, 0, 0);               
                return;
              }
              
          if(this.geldUitwissel.length === 0 || this.geldUitwissel.length === 1) return; 
        }else if(nietGelijk == 1){
          if(persoon.betalen > (-1 *this.personenMetLening[i].betalen ))
              {            
                persoon.betalen += this.personenMetLening[i].betalen;
                this.resultaat += persoon.naam + " moet " +  -1 * this.personenMetLening[i].betalen + " euro geven aan " + this.personenMetLening[i].naam + ", \n";
                this.personenMetLening.splice(v, 1);
                this.geldUitwissel(this.personenMetLening[0], 0, 0, 0);              
              }
              else if(Math.abs(persoon.betalen) < Math.abs(this.personenMetLening[i].betalen) )
              {
                this.personenMetLening[i].betalen += persoon.betalen;
                this.resultaat += persoon.naam + " moet " + persoon.betalen + " euro geven aan " + this.personenMetLening[i].naam + "\n";
                this.personenMetLening.splice(count, 1);
                this.geldUitwissel(this.personenMetLening[0], 0, 0, 0);
                return;
              }
        }       
      }
      this.geldUitwissel(this.personenMetLening[count +1 ], count +1, 0, 0);
    
  }

}
