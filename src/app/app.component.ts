import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cricket';

  Error:any;
  form : any;
  data : any= null;
  show = false;
  Successmesage: any;
  @Input() name:string;

  player={
    "_id": "",
    "name": "",
    "span":"",
    "matches":"",
    "innings":"",
    "runs":"",
    "highestScore":"",
    "centuries":"",
    "halfCentury":"",
    "country":"",
    "wickets":"",
    "overs":""
  }



  constructor(private http: HttpClient) {
    this.getplayers();
    this.name= "";
  }

  ngOnInit(){
    this.form = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", Validators.required),
      span: new FormControl("", Validators.required),
      matches: new FormControl("", Validators.required),
      innings: new FormControl("", Validators.required),
      runs: new FormControl("", Validators.required),
      highestScore: new FormControl("", Validators.required),
      centuries: new FormControl("", Validators.required),
      halfCentury: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      wickets: new FormControl("", Validators.required),
      overs: new FormControl("", Validators.required),
    });
  }
  CloseModal(){
    this.show= false;
  }
  
  handleSearch(){
    console.log(this.name);
    this.http.get("http://127.0.0.1:8080/api/Player/"+ this.name+"").subscribe((data) => {
    this.data = data;
    })
  }
  ShowModal(){
    this.show= true
  }

  getplayers() {
    this.http.get("http://127.0.0.1:8080/api/Players").subscribe((data) => {
    this.data = data;
    })
  }

  delPlayer(id : any){
    this.http.delete("http://127.0.0.1:8080/api/DeletePlayer/"+ id+"").subscribe(()=>{
      this.Successmesage= "Player deleted successfully";
      this.getplayers();
    })
  }

  editPlayer(Player: any, id: number){
    this.form.setValue({
      _id: Player._id,
      name :Player.name,
      country: Player.country,
      span : Player.span,
      matches : Player.matches,
      innings : Player.innings,
      runs :Player.runs,
      highestScore : Player.highestScore,
      centuries : Player.centuries,
      halfCentury : Player.halfCentury,
      wickets :Player.wickets,
      overs : Player.overs
    })
    this.show= true;
  }


  getPlayerbyID(id:any){
    this.http.get("http://127.0.0.1:8080/api/DeletePlayer/"+ id+"").subscribe(()=>{
      this.Successmesage= "Player deleted successfully";
      
      this.getplayers();
    })
  }

  submitForm(result:any){
    if(result.valid){
      this.player._id= result.value._id,
      this.player.name = result.value.name,
      this.player.country = result.value.country,
      this.player.span = result.value.span,
      this.player.matches = result.value.matches,
      this.player.innings = result.value.innings,
      this.player.runs = result.value.runs,
      this.player.highestScore = result.value.highestScore,
      this.player.centuries = result.value.centuries,
      this.player.halfCentury = result.value.halfCentury,
      this.player.wickets = result.value.wickets,
      this.player.overs = result.value.overs


      if(result.value._id === null || result.value._id === ""){
        this.http.post("http://127.0.0.1:8080/api/Player", this.player).subscribe((res)=>{
          this.show = false;
          this.Successmesage = ""+ result.value.name+" Added Successfully";
        })
      }
      else{
        this.http.patch("http://127.0.0.1:8080/api/Player/"+result.value._id+"", this.player).subscribe((res)=>{
        this.show = false;
        this.Successmesage = ""+ result.value.name+" updated successfully";
      })
      }
    this.getplayers();
      
    }
    else{
      this.Error="Please fill all the important fields"

    }
  }

}
