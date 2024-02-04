var that;
var oTableSr;
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("zfazfa_form.controller.App", {
		onInit: function() {
			//put your logic here
			that = this;
			oTableSr = 0;
			var oModel = new sap.ui.model.json.JSONModel({
				items: [] // Initially, an empty array for items
			});
			this.getView().setModel(oModel);
		},
		onAddPress: function(oEvent) {
			debugger;
			var oTable = oEvent.getSource().getParent().getParent();
			var bindingPath = oTable.mBindingInfos.items.path;
			// Get the model bound to the Table
			var oModel = oTable.getModel();

			// Get the current items array from the model
			var aItems = oModel.getProperty(bindingPath) || [];
			// Create a new item with serial number, data, and input fields
			var oNewItem = {
				SerialNumber: aItems.length + 1
			};

			// Add the new item to the items array
			aItems.push(oNewItem);

			// Set the updated items array back to the model
			oModel.setProperty(bindingPath, aItems);
		},
		onRemovePress: function(oEvent) {
			debugger;
			// Get the reference to the Table
			var oTable = oEvent.getSource();
			var bindingPath = oTable.mBindingInfos.items.path;
			var oItem = oEvent.getParameter("listItem");

            if (oItem) {
                var iIndex = oItem.getBindingContext().getPath().split("/").pop();
				oTable.removeItem(oItem);
                // Get the model
                var oModel = this.getView().getModel();

                // Get the current items array from the model
                var aItems = oModel.getProperty(bindingPath) || [];

                // Remove the item from the items array in the model
                aItems.splice(iIndex, 1);
                
                aItems.forEach(function (item, index) {
                    item.SerialNumber = index + 1;
                });
                
                oModel.setProperty(bindingPath, aItems);
                
                
            }
		},
		onRemoveSelectedItemPress: function(oEvent) {
			debugger;
			// Get the reference to the Table
			var oTable = oEvent.getSource().getParent().getParent();

			// Get the selected item
			var oSelectedItem = oEvent.getParameters().listItem;

			// If an item is selected, remove it
			if (oSelectedItem) {
				var iIndex = oTable.indexOfItem(oSelectedItem);

				// Remove the item from the items array in the model
				var aItems = oTable.getModel().getProperty("/items") || [];
				aItems.splice(iIndex, 1);
				oTable.getModel().setProperty("/items", aItems);

				// Remove the item from the Table
				oTable.removeItem(oSelectedItem);
			}
		},
		onAddItemPress: function(oEvent) {
			debugger;
			// Get the reference to the Table
			var oTable = oEvent.getSource().getParent().getParent();

			// Get the model bound to the Table
			var oModel = oTable.getModel();

			// Get the current items array from the model
			var aItems = oModel.getProperty("/items") || [];

			// Create a new item with serial number, data, and input fields
			var oNewItem = {
				SerialNumber: aItems.length + 1,
				Column1: new sap.m.Input({
					value: ""
				}), // Input field for Column1
				Column2: new sap.m.Input({
					value: ""
				}),
				Column3: new sap.m.Input({
					value: ""
				}),
				Column4: new sap.m.Input({
					value: ""
				}),
				Column5: new sap.m.Input({
					value: ""
				}),
				Column6: new sap.m.Input({
					value: ""
				}),
				Column7: new sap.m.Input({
					value: ""
				}),
				Column8: new sap.m.Input({
					value: ""
				})
			};

			// Add the new item to the items array
			aItems.push(oNewItem);

			// Set the updated items array back to the model
			oModel.setProperty("/items", aItems);

			// Add the new item to the Table
			// oTable.addItem(new sap.m.ColumnListItem({
			// 	cells: [
			// 		new sap.m.Text({
			// 			text: oNewItem.SerialNumber
			// 		}),
			// 		oNewItem.Column1,
			// 		oNewItem.Column2,
			// 		oNewItem.Column3,
			// 		oNewItem.Column4,
			// 		oNewItem.Column5,
			// 		oNewItem.Column6,
			// 		oNewItem.Column7,
			// 		oNewItem.Column8
			// 	]
			// }));
		}
	});
});