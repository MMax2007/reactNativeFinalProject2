from django.db.models import Q
from .models import (
    Campaign,
    Group,
    Element,
    Reaction
)

class Service:
    @staticmethod
    def get_all_components(component_type):
        match component_type:
            case 'campaigns':
                ct = Campaign
            case 'groups':
                ct = Group
            case 'elements':
                ct = Element
            case 'reactions':
                ct = Reaction
        components = ct.objects.all()
        return [
            component.to_dict_full()
            for component
            in components
        ]
    
    @staticmethod
    def get_components_by_campaign(camp_id, component_type):
        match component_type:
            case 'groups':
                command = 'get_groups_by_campaign'
            case 'elements':
                command = 'get_elements_by_campaign'
            case 'reactions':
                command = 'get_reactions_by_campaign'
        campaign = Campaign.objects.get(id=camp_id)
        return getattr(campaign, command)()
    
    @staticmethod
    def get_components_by_group(group_id, component_type):
        match component_type:
            case 'campaign':
                command = 'get_campaign_by_group'
            case 'elements':
                command = 'get_elements_by_group'
            case 'child_groups':
                command = 'get_child_groups'
            case 'parent_group':
                command = 'get_parent_group'
            case 'all':
                command = 'get_group_items'
        group = Group.objects.get(id=group_id)
        return getattr(group, command)()
    
    @staticmethod
    def get_components_by_element(elem_id, component_type):
        match component_type:
            case 'campaign':
                command = 'get_campaign_by_element'
            case 'group':
                command = 'get_group_by_element'
            case 'reactions':
                command = 'get_reactions_by_element'
            case 'recipes':
                command = 'get_recipes'
        element = Element.objects.get(id=elem_id)
        return getattr(element, command)()
    
    @staticmethod
    def search_reaction_by_reagents(reagent_a, reagent_b):
        reaction = Reaction.objects.filter(
            Q(
                element_a = reagent_a,
                element_b = reagent_b
            ) |
            Q (
                element_a = reagent_b,
                element_b = reagent_a
            )
        ).first()
        if reaction:
            return reaction.to_dict_full()
        return None