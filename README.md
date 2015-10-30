Strength.js
===========

The ultimate jQuery password input plugin. Featuring secure strength indicator.

### Changes
Show/hide password is now available as an option and two more options have been added.

The original uses a second input field for the show/hide feature. I have removed this and updated the feature to change the input type to text on show and to password on hide. This made it easier to use with nice CSS styling.

The placement of the strength HTML elements have been changed. A holder is now wrapped around the input field and the strength meter is positioned behind the input field. Required CSS has been added to the CSS file.

After page load, the input field is checked for a value. If a value is found the strength validation is triggered

### Added options
* showPasswordToggle, enable or disable the Show / hide password button. Default = true
* allowCopyPasteCut, enable or disable the possibility to copy, paste or cut from the password field. Default = false
* copyPasteCutMessage, the message that will be alerted when allowCopyPasteCut is set to false

### Documentation

Strength.js provides a toggle feature for password input fields that allows the user to view or asterisk the password. It also features a strength indicator to show how secure a users password is.

#### ..:: Demo
For a demo visit http://git.aaronlumsden.com/strength.js/


The password secuirty indicator is marked on 4 scores. These are

*   Password must contain 8 characters or more
*   Password must contain 1 lowercase letter
*   Password must contain 1 uppercase letter
*   Password must contain 1 number
*   Password must contain 1 special character

#### ..:: Getting Started

##### Include the relevant files

Firstly include jQuery and the strength.css and strength.js files. Place these before `&lt;/head&gt;` section

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="strength.js"></script>
	<script type="text/javascript" src="js.js"></script>
					

##### Create a password input field

You must give your password input a unique ID.

	<input id="myPassword" type="password" name="" value="">

##### Initiate the plugin

Once you have created your password input field you will need to initiate the plugin.

At its most basic level you can initiate the plugin like:

						
	$(document).ready(function ($) {

        $("#myPassword").strength();

    });
					

If you want to initiate the plugin with options then you can do so like:

								
	$('#myPassword').strength({
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show Password',
            strengthButtonTextToggle: 'Hide Password',
            showPasswordToggle: true,
            allowCopyPasteCut: false,
            copyPasteCutMessage: 'You must (re)-enter your password manually'
        });		

#### ..:: Options

<table>
							<thead>
								<tr>
									<th>Variable</th>
									<th>Default Value</th>
									<th>Description</th>
									<th>Valid Options</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>strengthClass</td>
									<td>strength</td>
									<td>The CSS class that you want your input field to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthMeterClass</td>
									<td>strength_meter</td>
									<td>The CSS class that you want your input field to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonClass</td>
									<td>button_strength</td>
									<td>The CSS class that you want the toggle button to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonText</td>
									<td>Show Password</td>
									<td>The text that you want to show for the toggle button</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonTextToggle</td>
									<td>Hide Password</td>
									<td>The toggled text that you want to show for the toggle button</td>
									<td></td>
								</tr>
								<tr>
									<td>showPasswordToggle</td>
									<td>true</td>
									<td>Enable or disable the Show/hide password button</td>
									<td>true / false</td>
								</tr>
								<tr>
									<td>allowCopyPasteCut</td>
									<td>false</td>
									<td>Enable or disable the possibility to copy, paste or cut from the password field</td>
									<td>true / false</td>
								</tr>
								<tr>
									<td>copyPasteCutMessage</td>
									<td>You must (re)-enter your password manually</td>
									<td>When allowCopyPasteCut is false, this message will be alerted</td>
									<td></td>
								</tr>
							</tbody>
						</table>
