<template>
    <div id="">{{message}}</div>
</template>

<script>
export default {
	name   : 'switchlogin',
	data() {
		return {
			message: '切换中...' 
		}
	},
	mounted(){
	  	this.$store.dispatch('update_willSwitchUnitId', {
	        willSwitchUnitId:this.$route.params.unitId
	    }).then(() => {
	        this.$$api_order_switchUnit({
		        data:"unitId="+this.$route.params.unitId,
		        headers :{'Content-Type': 'application/x-www-form-urlencoded'},
		        fn:response_data=>{
		        	this.$store.dispatch('update_willSwitchUnitId', {
				        willSwitchUnitId:null
				    });
		            this.$router.push('/');
		        }
		    });
	    });
   }
}

</script>

<style scoped lang='less'>
   
</style>
