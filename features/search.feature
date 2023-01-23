Feature: Ticket booking tests

    Scenario: Should book available ticket 
        Given user enters the page "/client/index.php" 
        When user choose date "6" 
        When user choose movie "2" time "2" 
        When user choose a row and a seat "2", "10" 
        When user click on the booking button 
        When user click on the button to get booking code 
        Then user get the code and text "Электронный билет" 

    Scenario: Should book some available tickets 
        Given user enters the page "/client/index.php" 
        When user choose date "6" 
        When user choose movie "2" time "2" 
        When user choose a row and a seat "2", "9" 
        When user choose a row and a seat "2", "8" 
        When user click on the booking button 
        When user click on the button to get booking code 
        Then user get the code and text "Электронный билет" 

    Scenario: Should try to book unavailable ticket unsuccessfully 
        Given user enters the page "/client/index.php" 
        When user choose date "6" 
        When user choose movie "2" time "2" 
        When user choose a row and a seat "1", "10"
        When user click on the booking button 
        Then button for booking is inactive "true"
