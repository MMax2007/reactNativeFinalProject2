from django.db import models

class Campaign(models.Model):
    id = models.CharField(
        max_length=4,
        unique=True,
        primary_key=True,
        verbose_name='идентификатор кампании'
    )
    title = models.CharField(
        max_length=256,
        verbose_name='название кампании',
        unique=True
    )
    image = models.CharField(
        max_length=128,
        blank=True,
        verbose_name='иллюстрация',
    )

    def to_dict_mini(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image
        }
    
    def to_dict_medium(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'groups': [
                group.title
                for group
                in self.groups.all()
            ]
        }
    
    def to_dict_full(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'groups': [
                group.to_dict_medium()
                for group
                in self.groups.all()
            ]
        }
    
    def get_groups_by_campaign(self):
        return [
            group.to_dict_full()
            for group
            in self.groups.all()
        ]
    
    def get_elements_by_campaign(self):
        elements = []

        for group in self.groups.all():
            elements.extend(group.elements.all())
        return [
            element.to_dict_full()
            for element
            in elements
        ]
    
    def get_reactions_by_campaign(self):
        elements = []

        for group in self.groups.all():
            elements.extend(group.elements.all())

        result = []
        for element in elements:
            recipes = element.get_recipes()
            if recipes:
                result.extend(recipes)
        return result

    def __str__(self):
        return self.title

class Group(models.Model):
    id = models.CharField(
        max_length=64,
        unique=True,
        primary_key=True,
        verbose_name='идентификатор группы'
    )
    title = models.CharField(
        max_length=256,
        verbose_name='название группы'
    )
    parent_group = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        related_name='child_groups',
        null=True,
        blank=True,
        verbose_name='родительская группа'
    )
    campaign = models.ForeignKey(
        'Campaign',
        on_delete=models.CASCADE,
        related_name='groups',
        verbose_name='кампания'
    )
    image = models.CharField(
        max_length=128,
        blank=True,
        verbose_name='иллюстрация',
    )

    def to_dict_mini(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image
        }
    
    def to_dict_medium(self):
        return {
            'id': self.id,
            'title': self.title,
            'parent_group': (
                self.parent_group.id
                if self.parent_group
                else None
            ),
            'campaign': self.campaign.id,
            'image': self.image,
            'child_groups': [
                cg.id
                for cg
                in self.child_groups.all()
            ],
            'elements': [
                element.id
                for element
                in self.elements.all()
            ]
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'title': self.title,
            'parent_group': (
                self.parent_group.to_dict_mini()
                if self.parent_group
                else None
            ),
            'campaign': self.campaign.id,
            'image': self.image,
            'child_groups': [
                cg.to_dict_mini()
                for cg
                in self.child_groups.all()
            ],
            'elements': [
                element.to_dict_mini()
                for element
                in self.elements.all()
            ]
        }
    
    def get_campaign_by_group(self):
        return [
            self.campaign.to_dict_full()
        ]
    
    def get_elements_by_group(self):
        return [
            element.to_dict_full()
            for element
            in self.elements.all()
        ]
    
    def get_child_groups(self):
        return [
            cg.to_dict_mini()
            for cg
            in self.child_groups.all()
        ]
    
    def get_parent_group(self):
        return [
            self.parent_group.to_dict_full()
        ] if self.parent_group else []
    
    def get_group_items(self):
        return {
            'elements': self.get_elements_by_group(),
            'child_groups': self.get_child_groups()
        }

    def __str__(self):
        return f'{self.title} ({self.campaign}) [{self.parent_group}]'

class Element(models.Model):
    id = models.CharField(
        max_length=128,
        unique=True,
        primary_key=True,
        verbose_name='идентификатор элемента'
    )
    title = models.CharField(
        max_length=256,
        verbose_name='название элемента'
    )
    description = models.TextField(
        blank=True,
        verbose_name='описание элемента'
    )
    code_name = models.CharField(
        max_length=6,
        verbose_name='кодовое название элемента'
    )
    group = models.ForeignKey(
        'Group',
        on_delete=models.CASCADE,
        related_name='elements',
        verbose_name='группа'
    )
    image = models.CharField(
        max_length=128,
        blank=True,
        verbose_name='иллюстрация'
    )
    is_starter = models.BooleanField(
        default=False,
        verbose_name='этот элемент появляется в начале'
    )

    def to_dict_mini(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'code_name': self.code_name,
            'image': self.image,
            'is_starter': self.is_starter
        }
    
    def to_dict_medium(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'code_name': self.code_name,
            'image': self.image,
            'is_starter': self.is_starter,
            'group': self.group.id,
            'campaign': self.group.campaign.id,
            'produced_by': [
                {
                    'a': reaction.element_a.id,
                    'b': reaction.element_b.id
                }
                for reaction
                in self.produced_by.all()
            ]
        }
    
    def to_dict_full(self):
        reacts_with = []
        for i in self.reactions_as_a.all():
            reacts_with.append(i.element_b.to_dict_mini())
        for i in self.reactions_as_b.all():
            reacts_with.append(i.element_a.to_dict_mini())
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'code_name': self.code_name,
            'image': self.image,
            'is_starter': self.is_starter,
            'group': self.group.to_dict_mini(),
            'campaign': self.group.campaign.to_dict_mini(),
            'produced_by': [
                {
                    'a': reaction.element_a.to_dict_mini(),
                    'b': reaction.element_b.to_dict_mini()
                }
                for reaction
                in self.produced_by.all()
            ],
            'reacts_with': reacts_with
        }
    
    def get_campaign_by_element(self):
        return [
            self.group.campaign.to_dict_full()
        ]
    
    def get_group_by_element(self):
        return [
            self.group.to_dict_full()
        ]
    
    def get_reactions_by_element(self):
        reactions = []
        for i in self.reactions_as_a.all():
            reactions.append(i)
        for i in self.reactions_as_b.all():
            reactions.append(i)
        return [
            reaction.to_dict_full()
            for reaction
            in reactions
        ]
    
    def get_recipes(self):
        return [
                {
                    'elements': [
                        reaction.element_a.to_dict_full(),
                        reaction.element_b.to_dict_full(),
                    ],
                    'result': [
                        result.to_dict_full()
                        for result
                        in reaction.results.all()
                    ]
                }
                for reaction
                in self.produced_by.all()
            ]

    def __str__(self):
        return f'{self.title} ({self.group}, {self.group.campaign})'

class Reaction(models.Model):
    element_a = models.ForeignKey(
        'Element',
        on_delete=models.CASCADE,
        related_name='reactions_as_a',
        verbose_name='элемент A'
    )
    element_b = models.ForeignKey(
        'Element',
        on_delete=models.CASCADE,
        related_name='reactions_as_b',
        verbose_name='элемент B'
    )
    results = models.ManyToManyField(
        'Element',
        related_name='produced_by',
        verbose_name='результаты реакции'
    )

    def to_dict_mini(self):
        return {
            'elements': [
                self.element_a.id,
                self.element_b.id
            ],
        }
    
    def to_dict_medium(self):
        return {
            'elements': [
                self.element_a.id,
                self.element_b.id
            ],
            'result': [
                result.id
                for result
                in self.results.all()
            ]
        }
    
    def to_dict_full(self):
        return {
            'elements': [
                self.element_a.to_dict_mini(),
                self.element_b.to_dict_mini()
            ],
            'result': [
                result.to_dict_mini()
                for result
                in self.results.all()
            ]
        }
    
    def __str__(self):
        return f'{self.element_a.id} + {self.element_b.id}'