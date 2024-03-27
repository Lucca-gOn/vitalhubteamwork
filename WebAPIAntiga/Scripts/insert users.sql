SELECT TOP (1000) [ID]
      ,[TipoUsuario]
  FROM [VitalHub_G09M].[dbo].[TiposUsuario]

  INSERT INTO [VitalHub_G09M].[dbo].[TiposUsuario] ([ID], [TipoUsuario])
VALUES (NEWID(), 'Paciente'),
       (NEWID(), 'Medico');