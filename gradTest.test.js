function createMenuData(data) {
  var str;
  var menu = [];

  for (str of data) { // Iterates through each element of the data array that is provided

    if (str.includes("child")) { // Checks if there is a 'child', by searching for the term 'child' in the given element 
      var x = str.split("/"); // Splits the string contained in that element, at the '/' character, seperating the 'parent' from the 'child', and storing the resultant array in the variable x
                              
      if (menu.some(e => e.title === x[0])) { // Checks If a 'Parent' + a min of 1 'Child' exists (Searchs through the menu array, to find if the current parent stored in x[0] exists as a Title, in all menu objects
      menuIndex = menu.findIndex((f => f.title === x[0])); // Finds the Index of the object in the menu array, with the given Title
      menu[menuIndex].data.push(x[1]); // Appends the new child to the 'data' property of the object, with the same Title (same 'Parent')
      }
      else {  // For if there is a new Parent + Child Combination
        var combo = new Object();   // Creates a new object called combo
        combo.title = x[0];         // Adds a 'title' property to combo, with the value stored in x[0] (the 'parent' e.g. 'parent1')
        combo.data = [x[1]];        // Adds a 'data' property to combo, with the value stored in x[1] (the 'child' e.g. 'parent1child')
        menu.push(combo);           // Appends the object to the menu array
      };

    };
  };

  return menu; //Returns the Generated Menu 
}

describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });