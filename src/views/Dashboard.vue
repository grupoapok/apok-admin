<template>
    <div>
        <span>Dashboard</span>
        <p>FontAwesome <icon icon="check"/></p>
        <p>Material Icons (Oficial)<icon icon="check" material-icon/></p>
        <p>Material Design Icons (MDI) <icon icon="skull" mdi/></p>
    </div>
</template>

<script>
import Icon from '@/components/Icon';

export default {
    name: 'Dashboard',
    components: { Icon }
}
</script>

<style>

</style>
