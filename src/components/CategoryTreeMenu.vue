<template>
  <div class="q-pa-sm">
    <q-tree
      :nodes="nodes"
      node-key="key"
      selected-color="primary"
      :selected.sync="selected"
      default-expand-all
    />
  </div>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class CategoryTreeMenu extends Vue {
  // @ts-ignore
  @Prop() currentCategory: string;

  selected: string = '';
  nodes: any[] = [
    {
      label: 'Relax Hotel',
      children: [
        {
          label: 'Food',
          icon: 'restaurant_menu'
        },
        {
          label: 'Room service',
          icon: 'room_service'
        },
        {
          label: 'Room view',
          icon: 'photo'
        }
      ]
    }
  ];

  created () {
    this.selected = this.currentCategory;
    this.constructCategoryTree();
  }

  onSelectNode (node: any) {
    this.$emit('update:currentCategory', node.key);
    this.$emit('close');
  }

  constructCategoryTree () {
    const categoryList: string[] = this.$store.getters.getCategoryList;

    this.nodes = [{
      key: '',
      label: '전체',
      handler: this.onSelectNode
    }];

    for (const c of categoryList) {
      const splittedC = c.split('/');
      let currentC: string = '';

      let currentNode: any[] = this.nodes;
      for (let i in splittedC) {
        currentC = currentC.concat('/', splittedC[i]);
        let isFound: boolean = false;

        for (let j in currentNode) {
          if (splittedC[i] === currentNode[j].label) {
            if (!currentNode[j].children) {
              currentNode[j].children = [];
            }
            currentNode = currentNode[j].children;
            isFound = true;
            break;
          }
        }

        if (isFound === false) {
          const index = currentNode.push({ key: currentC.substr(1), label: splittedC[i], handler: this.onSelectNode, children: [] });
          currentNode = currentNode[index - 1].children;
        }
      }
    }
  }
}
</script>
