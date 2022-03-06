import {useEffect, useState} from 'react';
import './App.css';
import md5 from "md5";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap"
import $, { event } from 'jquery';
import photo from "./marvellogo.png";

let numofresults = 0;
let objectarray;
let timestamp=new Date().getTime().toString();
let hash = md5(timestamp+"1dcb46b5f11a736c66a710c676624ee21e00c025"+"7f9507ae90588d365ccdb128996f8f45"); //KORISTI ZA STVARANJE HASHA
let search="";
let apilist;
let timer;
let compareselected=0;
let sel1,sel2;

function App() {

  const[list,setList]=useState([]);

  useEffect(() => {
    bookmarked();       //POKRECE DVIJE FUNKCIJE NAKON UCITAVANJA STRANICE
    inputField();
  },[]);

//USEFFECT ZA SPREMANJE I PRIKAZIVANJE SPREMLJENIH PODATAKA, POKRECE SE SVAKI PUT KADA SE USESTATE PROMIJENI
  useEffect(()=>{

    if(list!=[]){localStorage.setItem("list",JSON.stringify(list));}

    $(function(){
      $(".bookmarkedcharacters div").remove();
      for(let i=0; i<list.length; i++){
        $(".bookmarkedcharacters").append("<div class='bookchar'><img src='"+list[i].thumbnail.path+".jpg' class='picturebookmark'/><p>"+list[i].name+"</p><p>"+list[i].description+"</p><p class='smalltext'>Click to compare with another character</p></div>"); 
      }
      $(".bookchar").on("click",compareCharacters);
    })

  },[list]);

//FUNKCIJA ZA UCITAVANJE SPREMLJENIH PODATAKA
  function bookmarked(){
      apilist=JSON.parse(localStorage.getItem("list"));
      if(apilist==null){apilist=[]};  //POTREBNO ZA SLUCAJE KADA NE POSTOJE SPREMLJENI PODACI
      setList(apilist);   //MIJENJA USESTATE I POKRECE USEFFECT    
  }

//FUNKCIJA ZA DODAVANJE NOVIH PODATAKA U USESTATE
  function addToStorage(){

    $(function(){
        let index=$(".carousel-item.active").index();   //ODABIRE LIKA KOJEG TRENUTNO PRIKAZUJE
        setList(previous=>[...previous,objectarray[index]]);
    })
  }

//FUNKCIJA ZA BRISANJE SPREMLJENIH PODATAKA
  function deleteBookmarks(){
    localStorage.clear();
    bookmarked();
  }

//FUNKCIJA ZA USPOREĐIVANJE LIKOVA
  function compareCharacters(event){
    compareselected++;
    if(compareselected==2){
      sel2=$(this).index();

      $(this).addClass("selected");
      $(this).find(".smalltext").text("Second character chosen");

      let char1=list[sel1].comics.available;
      let char2=list[sel2].comics.available;
      let scaled1=char1;
      let scaled2=char2;
      $("#titleLabel").text(list[sel1].name+" VS "+list[sel2].name+" - Who's more popular?");

      if(char1>char2){
        $(".section2").append("<p>"+list[sel1].name+" WINS!</p>");

        while(scaled1>300){
          scaled1=scaled1/2;
          scaled2=scaled2/2;  
        }
      }
      else if(char2>char1){
        $(".section2").append("<p>"+list[sel2].name+" WINS!</p>");
        while(scaled2>300){
          scaled1=scaled1/2;
          scaled2=scaled2/2;  
        }
      }
      else{
        $(".section2").append("<p>It's a draw!</p>");
        while(scaled2>300 && scaled1>300){
          scaled1=scaled1/2;
          scaled2=scaled2/2;  
        }  
      }
      $(".firstchargraph").before("<img src='"+list[sel1].thumbnail.path+".jpg' class='comparephoto img-fluid'/>");
      $(".secondchargraph").before("<img src='"+list[sel2].thumbnail.path+".jpg' class='comparephoto img-fluid'/>");
      $(".firstchargraph").animate({height: scaled1+"px"},2000);
      $(".section1").append("<span>"+char1+"</span>");
      $(".section3").append("<span>"+char2+"</span>");
      $(".secondchargraph").animate({height: scaled2+"px"},2000);
      $('#staticBackdrop').modal('show');
      sel1=sel2=null;
      compareselected=0;

    }
    else{
      sel1=$(this).index();
      $(this).addClass("selected");
      $(this).find(".smalltext").text("First character chosen");
    }
  };

//FUNKCIJA ZA RESETIRANJE USPOREĐIVANJA
  function resetModal(){
    $(function(){
      $(".section2 p,.section1 span,.section3 span").remove();
      $(".bookchar").removeClass("selected");
      $(".bookchar .smalltext").text("Click to compare with another character");
      $(".firstchargraph,.secondchargraph").css("height","0px");
      $(".section1 img,.section3 img").remove();
    })
  }

//GLAVNA FUNKCIJA ZA UZIMATI I PRIKAZIVATI PODATKE IZ MARVEL API
  function inputField(){
    clearTimeout(timer);
    timer = setTimeout(startSearch, 500);   //TIMEOUT KORISTI KAKO BI SE FUNKCIJA POZVALA SAMO NAKON STO KORISNIK PRESTANE PISATI
    $(".spinner-border").fadeIn();

    function startSearch(){
      
        search = document.getElementById("select").value;   //UZIMA VRIJEDNOST IZ INPUTA
        if(search==""){search=" "};
        $(".spinner-border").fadeOut();

        //UZIMA PODATKE IZ API-JA I PRETVARA U OBJEKTA
        fetch("https://gateway.marvel.com/v1/public/characters?ts="+timestamp+"&nameStartsWith="+search+"&apikey=7f9507ae90588d365ccdb128996f8f45&hash="+hash)
        .then(res=>res.json())
        .then(data=>{
          objectarray=data.data.results;
        })

        //UZIMA BROJ REZULTATA KOJE JE NASLO
        .then(()=>{
          fetch("https://gateway.marvel.com/v1/public/characters?ts="+timestamp+"&nameStartsWith="+search+"&apikey=7f9507ae90588d365ccdb128996f8f45&hash="+hash)
          .then( res => res.json())
          .then( data => {
            numofresults = data.data.results.length;
          })

          //PRIKAZUJE ELEMENTE NA SUCELJU
          .then(()=>{

            $(function(){
              if(numofresults==0){
                $("#carouselIndicators, .bookmark").fadeOut();
                $(".noresult").fadeIn(); 
              }
              else{
                $("#carouselIndicators, .bookmark").fadeIn();
                $(".noresult").fadeOut(); 
              }

              $(".carousel-indicators li").remove();
              $(".carousel-inner .carousel-item").remove();

              for(let i=0; i<numofresults; i++){
                $(".carousel-indicators").append("<li data-target='#carouselIndicators' data-slide-to="+i+"></li>"); 
                $(".carousel-inner").append("<div class='carousel-item'></div>");
                $(".carousel-item").eq(i).append("<h1>"+objectarray[i].name+"</h1>");
                $(".carousel-item").eq(i).append("<p>"+objectarray[i].description+"</p>");
        
                $(".carousel-item").eq(i).append("<img src='"+objectarray[i].thumbnail.path+".jpg' class='picture img-fluid'/>");

                if(i==0){
                  $(".carousel-indicators li").eq(0).addClass("active");
                  $(".carousel-inner .carousel-item").eq(0).addClass("active");
                }
              }   
            })
          
          })
        })
    }
  }

  return (
  <div className="container" id="App">
      <div className="row">
        <div className="col-lg-12">
          <img src={photo} className='img-fluid logo'></img>
          <h1 align="center">CHARACTER SEARCH</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
        <input type="text" class="form-control" placeholder="Search for any Marvel character..." aria-label="Username" aria-describedby="addon-wrapping" id="select" onChange={inputField}></input>
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        </div>
      </div>

      <div className="row">
        <div className='col-lg-12'>
          <div id="carouselIndicators" class="carousel slide" data-interval="false">
            <ol class="carousel-indicators">
            </ol>
            <div class="carousel-inner">
            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselIndicators" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselIndicators" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </button>
          </div>
          <button onClick={addToStorage} type='button' className='btn btn-danger bookmark btn-lg'>Bookmark</button>
          <div class='alert alert-danger noresult' role='alert'>NO RESULTS</div>
        </div>  
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 id="bookmarklist">Bookmarked characters:</h1>
          <button onClick={deleteBookmarks} type='button' className='btn btn-danger btn-lg'>Delete bookmarks</button>
        </div> 
      </div>

      <div className="row">
        <div className="col-lg-12 bookmarkedcharacters">
        </div>  
      </div>

      <div className="row">
        <div className='col-sm-12 credit'>
          Created by Marin Boban
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12 modaldiv'>
          <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="titleLabel"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={resetModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="section1">
                    <div className="firstchargraph"></div>
                  </div>

                  <div class="section2">

                  </div>

                  <div class="section3">
                    <div className="secondchargraph"></div>
                  </div>

                </div>
                <div class="modal-footer">
                  <p>The numbers represent how many comics the characters appeared in.</p>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={resetModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}

export default App;
