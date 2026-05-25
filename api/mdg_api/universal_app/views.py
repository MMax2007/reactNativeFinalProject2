from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_418_IM_A_TEAPOT
)
from .service import Service
from .models import (
    Campaign,
    Group,
    Element,
    Reaction
)

class GetAllComponentsByType(APIView):
    def get(self, request, component_type):
        try:
            result = Service.get_all_components(
                component_type = component_type
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        return Response(
            result,
            status = HTTP_200_OK
        )
    
class GetComponentsByCampaign(APIView):
    def get(self, request, id, component_type):
        try:
            result = Service.get_components_by_campaign(
                camp_id = id,
                component_type = component_type
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        return Response(
            result,
            status = HTTP_200_OK
        )

class GetComponentsByGroup(APIView):
    def get(self, request, id, component_type):
        try:
            result = Service.get_components_by_group(
                group_id = id,
                component_type = component_type
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        return Response(
            result,
            status = HTTP_200_OK
        )

class GetComponentsByElement(APIView):
    def get(self, request, id, component_type):
        try:
            result = Service.get_components_by_element(
                elem_id = id,
                component_type = component_type
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        return Response(
            result,
            status = HTTP_200_OK
        )
    
class SearchReactionByReagents(APIView):
    def get(self, request, reagent_a, reagent_b):
        try:
            reagent_a = Element.objects.get(id=reagent_a)
            reagent_b = Element.objects.get(id=reagent_b)
            result = Service.search_reaction_by_reagents(
                reagent_a = reagent_a,
                reagent_b = reagent_b
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        if result is None:
            return Response(
                {
                    'message': 'not found'
                },
                status = HTTP_404_NOT_FOUND
            )
        return Response(
            result,
            status = HTTP_200_OK
        )
    
class CampaignView(APIView):
    def get(self, request, id):
        try:
            campaign = Campaign.objects.get(id=id)
            return Response(
                campaign.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def patch(self, request, id):
        try:
            campaign = Campaign.objects.get(id=id)
            if 'title' in request.data:
                campaign.title = request.data.get('title', [])
            if 'image' in request.data:
                campaign.image = request.data.get('image', [])
            campaign.save()
            return Response(
                campaign.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def delete(self, request, id):
        try:
            campaign = Campaign.objects.get(id=id)
            campaign.delete()
            return Response(
                status = HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )

class CampaignPOSTView(APIView):
    def post(self, request):
        try:
            campaign = Campaign.objects.create(
                id = request.data.get('id'),
                title = request.data.get('title'),
                image = request.data.get('image', ''),
            )
            return Response(
                campaign.to_dict_full(),
                status = HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
class GroupView(APIView):
    def get(self, request, id):
        try:
            group = Group.objects.get(id=id)
            return Response(
                group.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def patch(self, request, id):
        try:
            group = Group.objects.get(id=id)
            if 'title' in request.data:
                group.title = request.data.get('title', [])
            if 'parent_group' in request.data:
                group.parent_group = Group.objects.get(id=request.data.get('parent_group', []))
            if 'image' in request.data:
                group.image = request.data.get('image', [])
            group.save()
            return Response(
                group.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def delete(self, request, id):
        try:
            group = Group.objects.get(id=id)
            group.delete()
            return Response(
                status = HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )

class GroupPOSTView(APIView):
    def post(self, request):
        try:
            if request.data.get('parent_group'):
                parent_group = Group.objects.get(id=request.data.get('parent_group'))
            else:
                parent_group = None
            group = Group.objects.create(
                id = request.data.get('id'),
                title = request.data.get('title'),
                parent_group = parent_group,
                campaign = Campaign.objects.get(id=request.data.get('campaign')),
                image = request.data.get('image', ''),
            )
            return Response(
                group.to_dict_full(),
                status = HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
class ElementView(APIView):
    def get(self, request, id):
        try:
            element = Element.objects.get(id=id)
            return Response(
                element.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def patch(self, request, id):
        try:
            element = Element.objects.get(id=id)
            if 'title' in request.data:
                element.title = request.data.get('title', [])
            if 'description' in request.data:
                element.description = request.data.get('description', [])
            if 'code_name' in request.data:
                element.code_name = request.data.get('code_name', [])
            if 'group' in request.data:
                element.group = Group.objects.get(id=request.data.get('group', []))
            if 'image' in request.data:
                element.image = request.data.get('image', [])
            if 'is_starter' in request.data:
                element.is_starter = request.data.get('is_starter', [])
            element.save()
            return Response(
                element.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def delete(self, request, id):
        try:
            element = Element.objects.get(id=id)
            element.delete()
            return Response(
                status = HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )

class ElementPOSTView(APIView):
    def post(self, request):
        try:
            element = Element.objects.create(
                id = request.data.get('id'),
                title = request.data.get('title'),
                description = request.data.get('description', ''),
                code_name = request.data.get('code_name'),
                group = Group.objects.get(id=request.data.get('group')),
                image = request.data.get('image', ''),
                is_starter = request.data.get('is_starter'),
            )
            return Response(
                element.to_dict_full(),
                status = HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
class ReactionView(APIView):
    def get(self, request, id):
        try:
            reaction = Reaction.objects.get(id=id)
            return Response(
                reaction.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def patch(self, request, id):
        try:
            reaction = Reaction.objects.get(id=id)
            if 'element_a' in request.data:
                reaction.element_a = Element.objects.get(id=request.data.get('element_a', []))
            if 'element_b' in request.data:
                reaction.element_b = Element.objects.get(id=request.data.get('element_b', []))
            if 'results' in request.data:
                results = [
                    Element.objects.get(id = i)
                    for i
                    in request.data['results']
                ]
                reaction.results.set(results)
            existing = (
                Reaction.objects.filter(
                    element_a = reaction.element_a,
                    element_b = reaction.element_b
                ).exclude(id = reaction.id).first()
                or
                Reaction.objects.filter(
                    element_a = reaction.element_b,
                    element_b = reaction.element_a
                ).exclude(id = reaction.id).first()
            )
            if existing:
                return Response(
                    {
                        'err': f'already exists'
                    },
                    status = HTTP_400_BAD_REQUEST
                )
            reaction.save()
            return Response(
                reaction.to_dict_full(),
                status = HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )
        
    def delete(self, request, id):
        try:
            reaction = Reaction.objects.get(id=id)
            reaction.delete()
            return Response(
                status = HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )

class ReactionPOSTView(APIView):
    def post(self, request):
        try:
            element_a = Element.objects.get(id=request.data['element_a'])
            element_b = Element.objects.get(id=request.data['element_b'])
            existing = (
                Reaction.objects.filter(
                    element_a = element_a,
                    element_b = element_b
                ).first()
                or
                Reaction.objects.filter(
                    element_a = element_b,
                    element_b = element_a
                ).first()
            )
            if existing:
                return Response(
                    {
                        'err': f'already exists'
                    },
                    status = HTTP_400_BAD_REQUEST
                )
            results = [
                Element.objects.get(id = i)
                for i
                in request.data['results']
            ]
            reaction = Reaction.objects.create(
                element_a = element_a,
                element_b = element_b,
            )
            reaction.results.set(results)
            reaction.save()
            return Response(
                reaction.to_dict_full(),
                status = HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {
                    'err': f'something is wrong: {e}'
                },
                status = HTTP_400_BAD_REQUEST
            )