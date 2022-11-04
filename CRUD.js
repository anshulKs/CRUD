var recordArray=[]
updateId=-1; //Used in editing records
$(document).ready(function($) {


	$('#form').submit(function() {
    if ($.trim($("#email").val()) === "" || $.trim($("#user_name").val()) === "") {
        alert('you did not fill out one of the fields');
        return false;
    }
});
	

	function record(id,name,age,password) //constructor that returns object of record
	{
		this.id=id;
		this.name=name;
		this.age=age;
		this.password=password;
	}

	$("#txtName").change(function(event) { 			//validates name 
		var checkName=$(this).val();
				$(this).click(function(event) {
					$(this).css('border-color','white')
					$(this).val("");
				});

		if((/^([a-z A-Z]+)$/).test(checkName)==false)  //checks for any numeric value
		{
			alert("write correct name");
			$(this).css('border-color','red');
		}
	});

	$("#numberAge").change(function(event) {			//checks if age between 18 and 60
		var checkAge=$(this).val();
		if(checkAge<18 || checkAge>60 || checkAge=="")
		{
			alert("enter correct age");
			$(this).val("");
		}
	});

	$("#txtPassword").change(function(event) {			//validates password using regex
		var name=$(this).val();
				$(this).click(function(event) {
					$(this).css('border-color','white');
				});

		if((/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/).test(name)==false)
		{
			alert("write correct Passowrd (must be more than 6 characters with the combination of special and alphanumeric characters)");
			$(this).css('border-color','red');
			$(this).val("");
		}
	});

	$("#buttonAdd").click(function(event) {          //checks fields are empty or not and adds record
		
		if($("#txtName").val()=="" || $("#numberAge").val()=="" || $("#txtPassword").val()=="")
		{
			alert("fill all fields");
		}
		else if(updateId==-1)						// if updateId is not -1 then the record is updated
		{
			var id=recordArray.length+1;
			var name=$("#txtName").val();
			var age=$("#numberAge").val();
			var password=$("#txtPassword").val();
			
			newRecord=new record(id,name,age,password);
			recordArray.push(newRecord);
			printTable();
		}
		else
		{
			var name=$("#txtName").val();
			var age=$("#numberAge").val();
			var password=$("#txtPassword").val();
			for(count=0;count<recordArray.length;coun++)
			{
				if(recordArray[count]['id']==updateId)
				{
					recordArray[count]['name']=name;
					recordArray[count]['age']=age;
					recordArray[count]['password']=password;
					updateId=-1;
					printTable();
				}
			}
		}
});
	});

	function printTable()			//prints the table using recordArray
{
	var makeTable="";
	for(i=0;i<recordArray.length;i++)
	{
		makeTable+="<tr id='"+recordArray[i]['id']+"'><td>"+recordArray[i]['name']+"</td>"
									
									+"<td>"+recordArray[i]['age']+"</td>"
									// +"<td>"+recordArray[i]['password']+"</td>"
									+"<td><button onclick='deleteRow("+recordArray[i]['id']+")'>Delete</button></td>"
									+"<td><input type='button' class='edit' value='Edit' onclick='editRecord("+recordArray[i]['id']+")'></td></tr>";	
	}
		$("#txtName").val("");
		$("#numberAge").val("");
		$("#txtPassword").val("");
	$("#displayTable tbody").html(makeTable);

}
function deleteRow(id)				//use to delete row of record
{

	$("#displayTable #"+id).remove();
}

function editRecord(id)
{
	for(z=0;z<recordArray.length;z++)
	{
		if(recordArray[z]['id']==id)
		{
			updateId=recordArray[z]['id'];
			$("#txtName").val(recordArray[z]['name']);
			$("#numberAge").val(recordArray[z]['age']);
			
		}
	}
}


