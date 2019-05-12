// Actions
function changeTitle(title) {
  return {
    type:'CHANGE_TITLE',
    title
  }
}
function _addRow(arrRows = [], objRow) {
  return {
    type:'ADD_ROW',
    rows: arrRows.concat(objRow)
  }
}
function _removeRow(arrRows = [], index) {
  let arrNew = [].concat(arrRows);

  arrNew.splice(index,1);

  return {
    type:'REMOVE_ROW',
    rows: arrNew
  }
}
function _sortTable(table, sortBy="number") {
  // This will return an object which is propertly set up for the store's 
  // dispatch method.
  return {
    type:'SORT_TABLE',
    table: !table ? null : {
      columns: table.columns,
      rows: sortArray(table.rows, sortBy)
    }
  }
}

// This will sort an array by the top-level property provided. 
// Good for numbers and strings.
function sortArray(arrSource = [], sortBy = "number") {

  let arrSorted = [].concat(arrSource);
  // sort by name
  return arrSorted.sort(function(a, b) {
    // Leave numbers alone, but make strings case-insensitive.
    let itemA = (Number.isInteger(a[sortBy])) ? a[sortBy] : a[sortBy].toUpperCase();
    let itemB = (Number.isInteger(b[sortBy])) ? b[sortBy] : b[sortBy].toUpperCase();

    if (itemA < itemB) {
      return -1;
    }
    if (itemA > itemB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}


		// Initial state object
const initialState = {
	title: "My Sorted Redux Table",
  sortBy: 'number',
	table: {
		columns : [
			{
				title:"#", 
				sortType:"number",
				iconClass: "fa-sort-numeric-"
			},
			{
				title:"First", 
				sortType:"first",
				iconClass: "fa-sort-alpha-"
			},
			{
				title:"Last", 
				sortType:"last",
				iconClass: "fa-sort-alpha-"
			}
		],
		rows : [
			{
				first: "William",
				last: "Hartnell",
				number: 1
			},
			{
				first: "Patrick",
				last: "Troughton",
				number: 2
			},
			{
				first: "Jon",
				last: "Pertwee",
				number: 3
			},
			{
				first: "Tom",
				last: "Baker",
				number: 4
			},
			{
				first: "Peter",
				last: "Davison",
				number: 5
			},
			{
				first: "Colin",
				last: "Baker",
				number: 6
			},
			{
				first: "Sylvester",
				last: "McCoy",
				number: 7
			},
			{
				first: "Paul",
				last: "McGann",
				number: 8
			},
			{
				first: "Christopher",
				last: "Eccleston",
				number: 9
			},
			{
				first: "David",
				last: "Tennant",
				number: 10
			},
			{
				first: "Matt",
				last: "Smith",
				number: 11
			},
			{
				first: "Peter",
				last: "Capaldi",
				number: 12
			},
			{
				first: "Jodie",
				last: "Whittaker",
				number: 13
			}
		]
	}
}

// Reducer
function tableReducer(state = initialState, action) {
  switch(action.type) {
    case 'CHANGE_TITLE':
      // Overriding objects going last-to-first. End result is a new object 
      // with updated values.
      return Object.assign(
        {},
        state,
        {title: !action.title ? initialState.title : action.title}
      );
    case 'SORT_TABLE':
      // The sortTable function generates the action object for this case.
      return Object.assign(
        {},
        state,
        {
          table: action.table || initialState.table
        }
      );
    case 'ADD_ROW':
      // Return object works the same for add/remove, so just fall through to the next case.
    case 'REMOVE_ROW':
      return {
        ...{},
        ...state,
        table: {
          ...state.table,
          rows: action.rows || initialState.table.rows
        }
      }

    default:
      return state;
  }
}


// Store
const store = Redux.createStore(tableReducer);

store.subscribe(() => {
	let localStore = store.getState();
  $('#table-title').html(localStore.title);
	$('#table-container').empty().append( drawTable(localStore.table) );
});