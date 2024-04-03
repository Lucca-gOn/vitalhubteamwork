SELECT TOP (1000) [ID]
      ,[Prioridade]
  FROM [VitalHub_G09M].[dbo].[NiveisPrioridade]
  
  USE [VitalHub_G09M]

  insert into NiveisPrioridade values
  (NEWID(),'1'),
  (NEWID(),'2'),
  (NEWID(),'3')