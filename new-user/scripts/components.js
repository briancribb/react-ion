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

function drawTable(data) {
	// Draws a table according to the data passed in, so this can be sorted by sorting 
	// the arrays in the data before calling this function again.

	// Using jQuery to create the document fragment and nodes because it's already 
	// in the target Production environment and $('<div/>') is fewer characters than 
	// typing out document.createElement('div') every time. Also, it lets us use all
	// of jQuery's methods to assign classes and attributes.
	let $docFrag = $(document.createDocumentFragment());
	let $table = $('<table/>').addClass('table table-striped text-center'),
			$thead = $('<thead/>').addClass('thead-dark'),
			$tbody = $('<tbody/>');

	//Assemble the table's scaffolding.
	$docFrag.append($table.append($thead).append($tbody) );



	// ===========================================
	// Add rows and columns according to the data.
	// ===========================================


	// Build the table header row.
	data.columns.map( (column, i) =>{
		// Create a <th> then set the text, then add the icon to the <th>.
		return $thead.append(
			$('<th />')
				.attr('data-sortby', column.sortType)
				.text(column.title+' ')
				.append( $('<i />').addClass('fa ' + column.iconClass+'up') )
		);
	});
	$thead.append(
		$('<th />')
			.text('Remove')
	);

	data.rows.map( (row, i) =>{
		// Create the <tr> tags.
		let $tr = $('<tr />');

		// Now create the <td> tags for each row. The sort type of the column 
		// matches a property name in the row. So if the sort type is "first" 
		// then the loop asks for "row.first" to be used as table cell text. 
		data.columns.map( (column,j)=>{
			let $td = $('<td />').text(row[column.sortType]);
			return $tr.append($td);
		});

		$tr.append(
			$('<td />')
				.append(
					$('<button />')
						.attr('type', 'button')
						.attr('data-index', i)
						.addClass('btn-remove-row')
						.append(
							$('<i />').addClass('fa fa-times')
						)
				)
		);
		return $tbody.append($tr);
	});

	// The table is built, so return the document fragment.
	return $docFrag;
}

// Delegated listener.
function addListeners() {
	$('body').on({
		keyup: function(evt) {
			// Set the title to whatever the user types. Clearing out the input 
			// will result in an empty string, which will end up setting the 
			// title back to the initial state.
			if (evt.target.id === 'title-input') {
				store.dispatch({type: 'CHANGE_TITLE', title: evt.target.value})
			}
		},
		click: function(evt) {
      console.log('click', evt);
			let $target = $(evt.target);
			// Handle click on the table's header cells.
			if ( $target.closest('th')[0]) {
				// Using closest method in case the user clicks on the cell's children.
				let table = store.getState().table,
						sortBy = $target.closest('th').data('sortby');
        console.log('table, sortBy', table, sortBy);
				store.dispatch(_sortTable(table, sortBy))          
			}
			if (evt.target.id === 'add-row-submit') {
        let first = $('#add-row-first').val(),
            last = $('#add-row-last').val(),
            number = parseInt( $('#add-row-number').val() )

        // Super basic validation.
        if ( !first || !last || !number ) return;

				store.dispatch(
					_addRow(
						store.getState().table.rows,
						{
							first: first,
							last: last,
							number: number
						}
					)
				);
        $('.input-add-row').val('');
			}
			if ( $target.closest('.btn-remove-row')[0] ) {
				console.log($target.closest('.btn-remove-row').data('index'));
				store.dispatch(
					_removeRow(
						store.getState().table.rows,
						parseInt( $target.closest('.btn-remove-row').data('index') )
					)
				)
			}
		}
	});  
}


// Let's get started. Notice that we don't directly manipulate the DOM here. 
// We just dispatch actions and let the subscribe method take care of things.
$( document ).ready(function() {
	store.dispatch({type: 'CHANGE_TITLE'});
	store.dispatch({type: 'SORT_TABLE'});
  addListeners();
});