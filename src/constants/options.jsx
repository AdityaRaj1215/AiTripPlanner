export const SelectTravelList=[
    {
        id:1,
        title:'just me',
        people:'1 person',
        desc: 'a sole travel in exploration',
        
        icon : '✈'
        
    },
    {
        id:2,
        title:'couple',
        people:'couple',
        desc: 'a couple travel in exploration',
        
        icon : '✈',
     
    },
    {
        id:3,
        title:'family',
        people:'3 to 5 people',
        desc: 'a group having fun',
      
        icon : '✈'
        
    },
    {
        id:4,
        title:'friends',
        people:'6 to 8 people',
        desc: ' friends exploring stuffs',
        
        icon : '✈'
       
    }
]
export const SelectBudgetOptions=[
    {
        id:1,
        title:'cheap',
        desc:'cost concious',
        icon:'$'
    },
    {
        id:2,
        title:'moderate',
        desc:'cost on average side',
        icon:'$'
    },
    {
        id:3,
        title:'luxury',
        desc:'no issues with cost',
        icon:'$'
    }
]

export const AI_PROMT='Generate Travel plan for Location : {Location} for {totaldays} days for a {traveller} with {budget} budget, Give me Hotels option list with HotelName, Hotel Address, Price, Hotel image URL, geo coordinates, ratings, description and suggest an itinerary with PlaceName, PlaceDetails, Place image URL, geo coordinates, Ticket pricing, Rating, Time travel to each of the location for {totaldays} with each day plan with best time to visit in JSON format.'