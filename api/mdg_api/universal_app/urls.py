from django.urls import path
from .views import (
    GetAllComponentsByType,
    GetComponentsByCampaign,
    GetComponentsByGroup,
    GetComponentsByElement,
    SearchReactionByReagents,
    CampaignView,
    CampaignPOSTView,
    GroupView,
    GroupPOSTView,
    ElementView,
    ElementPOSTView,
    ReactionView,
    ReactionPOSTView
)

urlpatterns = [
    path('campaign/<str:id>/', CampaignView.as_view()),
    path('campaign/', CampaignPOSTView.as_view()),
    path('group/<str:id>/', GroupView.as_view()),
    path('group/', GroupPOSTView.as_view()),
    path('element/<str:id>/', ElementView.as_view()),
    path('element/', ElementPOSTView.as_view()),
    path('reaction/<int:id>/', ReactionView.as_view()),
    path('reaction/', ReactionPOSTView.as_view()),
    path('reaction/<str:reagent_a>/<str:reagent_b>/', SearchReactionByReagents.as_view()),
    path('<str:component_type>/all/', GetAllComponentsByType.as_view()),
    path('<str:component_type>/by_campaign/<str:id>/', GetComponentsByCampaign.as_view()),
    path('<str:component_type>/by_group/<str:id>/', GetComponentsByGroup.as_view()),
    path('<str:component_type>/by_element/<str:id>/', GetComponentsByElement.as_view()),
]