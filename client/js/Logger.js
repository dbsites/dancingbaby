export default class Logger
{
	static currentIds = [];
	static logAll = false;
	static disabled = false;
	static types = {
		LOG:'log',
		ERROR:'error',
		INFO:'info'
	};
	
	static LOGGER_IDS = {
		SERVICES:'SERVICES',
		
		// MODALS
		CONFIRM_MODAL:'CONFIRM_MODAL',
		ADD_DSI_MODAL:'ADD_DSI_MODAL',
		COPY_MODAL:'COPY_MODAL',
		EDIT_EFFECT_MODAL:'EDIT_EFFECT_MODAL',
		FIND_FIGURE_MODAL:'FIND_FIGURE_MODAL',
		
		// COMPONENTS
		ALERT_BAR_COMP:'ALERT_BAR_COMP',
		APP_COMP:'APP_COMP',
		ASSETS:'ASSETS',
		DATA_GRID_COMP:'DATA_GRID_COMP',
		COMPARE_COMP:'COMPARE_COMP',
		SELECTED_COMP:'SELECTED_COMP',
		FIGURE_LIST_COMP:'FIGURE_LIST_COMP',
		TOP_BAR_INFO_COMP:'TOP_BAR_INFO_COMP',
		FIGURE_VIEW_COMP:'FIGURE_VIEW_COMP',
		FILTER_BAR_COMP:'FILTER_BAR_COMP',
		FILTER_PANEL_COMP:'FILTER_PANEL_COMP',
		FOOTER_COMP:'FOOTER_COMP',
		LOGIN_COMP:'LOGIN_COMP',
		FIGURE_INFO_COMP:'FIGURE_INFO_COMP',
		USER_INFO_COMP:'USER_INFO_COMP',
		
		// CONTAINERS
		ALERT_BAR_CONTAINER:'ALERT_BAR_CONTAINER',
		FIGURE_LIST_CONTAINER:'FIGURE_LIST_CONTAINER',
		FIGURE_VIEW_CONTAINER:'FIGURE_VIEW_CONTAINER',
		FIGURE_VIEW_RIGHT_PANELS_CONTAINER:'FIGURE_VIEW_RIGHT_PANELS_CONTAINER',
		FIGURE_VIEW_LEFT_PANELS_CONTAINER:'FIGURE_VIEW_LEFT_PANELS_CONTAINER',
		FIGURE_VIEW_GRID_CONTAINER:'FIGURE_VIEW_GRID_CONTAINER',
		MAIN_CONTAINER:'MAIN_CONTAINER',
		MODAL_CONTAINER:'MODAL_CONTAINER',
		TOP_BAR_CONTAINER:'TOP_BAR_CONTAINER',
		
		// UTILS
		DRAG_MANAGER:'DRAG_MANAGER',
		UTILS:'UTILS',
		
		// REDUCERS
		ALERT_REDUCER:'ALERT_REDUCER',
		FIGURE_DATA_REDUCER:'FIGURE_DATA_REDUCER',
		FIGURE_PANEL_REDUCER:'FIGURE_PANEL_REDUCER',
		FIGURE_VIEW_PANEL_REDUCER:'FIGURE_VIEW_PANEL_REDUCER',
		GLOBAL_REDUCER:'GLOBAL_REDUCER',
		MODAL_REDUCER:'MODAL_REDUCER',
		USER_REDUCER:'USER_REDUCER'
	};
	
	
	static log()
	{
		let values = [].concat( ...arguments );
		if( !values ) return null;
		
		let params = values.shift();
		let id = params.id ? params.id.toUpperCase() : '';
		let type = params.type ? params.type : this.types.LOG;
		
		if( this.logAll || this.currentIds.length === 0 || this.currentIds.indexOf(id) > -1 )
		{
			if( !this.disabled ) console[type]( `${id} :: `, ...values );
		}
	}
	
	
	static addId( _id )
	{
		this.currentIds.push( _id.toUpperCase() );
	}
	
	
	static addIds( _ids )
	{
		if( !_ids ) return null;
		_ids.forEach(( id ) =>
		{
			this.addId(id);
		})
	}
	
	
	static clearIds()
	{
		this.currentIds = [];
	}
	
	
	static disableLogger( _disabled )
	{
		this.disabled = _disabled;
	}
}