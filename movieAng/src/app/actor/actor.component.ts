import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  moviesSort: any[] = [];

  section = 1;

  //actors
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  //movie
  title: string = "";
  year: number = 0;
  actors: any[] = [];

  movieID: string = "";
  actorID: string = "";
  


  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

  //added functionalities

  //get movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onSelectUpdateActor(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
  }

  onSelectUpdateMovie(item) {
    this.title = item.title;
    this.year = item.year;
  }



  addMovie(){
    const obj = { id: this.movieID};
    this.dbService.addMovie(this.actorID, obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });

  }

  filterBy(prop: string) {
    let moviesSort = this.moviesDB;
    return moviesSort.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }


  sortMovies(){

  this.dbService.getTop3Movies().subscribe((data: any[]) => {
    this.moviesDB = data;
  });
  }



}

