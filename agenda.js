// =====================================================
// SNEJIN AGENDA
// agenda.js
// =====================================================


import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



// =====================================================
// ELEMENTEN
// =====================================================


const calendarElement = document.getElementById("calendar");

const themeButton = document.getElementById("themeButton");

const logoutButton = document.getElementById("logoutButton");




// =====================================================
// LOGIN CONTROLE
// =====================================================


onAuthStateChanged(auth, (user)=>{


    if(!user){

        window.location.href = "index.html";

    }


});




// =====================================================
// UITLOGGEN
// =====================================================


if(logoutButton){


    logoutButton.addEventListener(
        "click",
        async ()=>{


            try{


                await signOut(auth);


                window.location.href =
                "index.html";


            }


            catch(error){


                console.error(
                    "Uitloggen mislukt:",
                    error
                );


            }


        }

    );


}




// =====================================================
// LICHT / DONKER MODUS
// =====================================================



function updateThemeIcon(){


    if(
        document.body.classList.contains("dark")
    ){


        themeButton.textContent = "☀️";

        themeButton.title =
        "Ga naar lichte modus";


    }

    else{


        themeButton.textContent = "🌙";

        themeButton.title =
        "Ga naar donkere modus";


    }


}




const savedTheme =
localStorage.getItem("theme");



if(savedTheme === "dark"){


    document.body.classList.add("dark");


}



if(themeButton){


    updateThemeIcon();



    themeButton.addEventListener(
        "click",
        ()=>{


            document.body.classList.toggle("dark");



            if(
                document.body.classList.contains("dark")
            ){


                localStorage.setItem(
                    "theme",
                    "dark"
                );


            }

            else{


                localStorage.setItem(
                    "theme",
                    "light"
                );


            }



            updateThemeIcon();


        }

    );


}




// =====================================================
// AFSPRAKEN
// =====================================================


let selectedEvent = null;


const addButton = document.getElementById("addEventButton");

const modal = document.getElementById("eventModal");

const saveButton = document.getElementById("saveEventButton");

const deleteButton = document.getElementById("deleteEventButton");

const cancelButton = document.getElementById("cancelEventButton");

const titleInput = document.getElementById("eventTitle");

const descriptionInput = document.getElementById("eventDescription");

const dateInput = document.getElementById("eventDate");

const timeInput = document.getElementById("eventTime");

const allDayInput = document.getElementById("allDay");

const categoryInput = document.getElementById("eventType");



function clearForm(){

    selectedEvent = null;

    titleInput.value = "";

    descriptionInput.value = "";

    dateInput.value = "";

    timeInput.value = "";

    allDayInput.checked = false;

    categoryInput.selectedIndex = 0;

}



function openModal(){

    clearForm();

    modal.style.display = "flex";

}



function closeModal(){

    modal.style.display = "none";

    clearForm();

}




// =====================================================
// FIRESTORE AFSPRAKEN
// =====================================================


const appointmentsRef = collection(db, "appointments");


const categoryColors = {

    work:"#e74c3c",

    holiday:"#27ae60",

    activity:"#2ecc71",

    birthday:"#f39c12",

    holidayofficial:"#f1c40f"

};



function getEventColor(category){

    return categoryColors[category] || "#3788d8";

}





// =====================================================
// FULLCALENDAR
// =====================================================


if(calendarElement){


    const calendar =
    new FullCalendar.Calendar(
        calendarElement,
        {


            initialView:
            "dayGridMonth",


            locale:
            "nl",


            firstDay:
            1,


            height:
            "auto",


            editable:true,


            selectable:true,


            headerToolbar:{


                left:
                "prev,next today",


                center:
                "title",


                right:
                "dayGridMonth,timeGridWeek,timeGridDay,listYear"


            },


            buttonText:{


                today:
                "Vandaag",


                month:
                "Maand",


                week:
                "Week",


                day:
                "Dag",


                list:
                "Agenda"


            },



            events:[],



            eventClick(info){


                selectedEvent = info.event;


                titleInput.value =
                info.event.title;


                descriptionInput.value =
                info.event.extendedProps.description || "";


                categoryInput.value =
                info.event.extendedProps.category || "activity";


                allDayInput.checked =
                info.event.allDay;



                const start =
                info.event.start;



                dateInput.value =
                start.toISOString().split("T")[0];



                if(!info.event.allDay){


                    timeInput.value =
                    start.toTimeString().substring(0,5);


                }

                else{


                    timeInput.value = "";


                }



                modal.style.display = "flex";


            }



        }

    );



    calendar.render();





    async function loadAppointments(){


        calendar.removeAllEvents();



        const snapshot =
        await getDocs(appointmentsRef);



        snapshot.forEach((document)=>{


            const event =
            document.data();



            calendar.addEvent({


                id:document.id,


                title:event.title,


                start:event.start,


                allDay:event.allDay,


                backgroundColor:
                getEventColor(event.category),


                borderColor:
                getEventColor(event.category),


                extendedProps:{


                    description:event.description,


                    category:event.category


                }


            });



        });



    }



    loadAppointments();



}
else{


    console.error(
        "Geen kalender gevonden (#calendar ontbreekt)"
    );


}




// =====================================================
// KNOPPEN POPUP
// =====================================================


if(addButton){


    addButton.addEventListener(
        "click",
        ()=>{


            openModal();


        }

    );


}



if(cancelButton){


    cancelButton.addEventListener(
        "click",
        ()=>{


            closeModal();


        }

    );


}




// =====================================================
// OPSLAAN / BEWERKEN
// =====================================================


if(saveButton){


saveButton.addEventListener("click", async ()=>{


    if(titleInput.value.trim()===""){


        alert("Geef de afspraak een naam.");

        return;


    }



    if(dateInput.value===""){


        alert("Kies een datum.");

        return;


    }



    let start =
    dateInput.value;



    if(!allDayInput.checked && timeInput.value){


        start += "T" + timeInput.value;


    }




    const eventData = {


        title:titleInput.value,


        description:descriptionInput.value,


        start:start,


        allDay:allDayInput.checked,


        category:categoryInput.value


    };





    if(selectedEvent){



        await updateDoc(

            doc(
                db,
                "appointments",
                selectedEvent.id
            ),

            eventData

        );



    }

    else{



        await addDoc(

            appointmentsRef,

            eventData

        );



    }



    closeModal();


    await loadAppointments();



});


}




// =====================================================
// VERWIJDEREN
// =====================================================


if(deleteButton){


deleteButton.addEventListener("click", async ()=>{


    if(!selectedEvent){


        closeModal();

        return;


    }



    if(!confirm("Weet je zeker dat je deze afspraak wilt verwijderen?")){


        return;


    }



    await deleteDoc(

        doc(
            db,
            "appointments",
            selectedEvent.id
        )

    );



    closeModal();



    await loadAppointments();



});


}
